import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Producto } from 'src/app/Models/products.interface';
import { FirestoreService } from 'src/app/Services/firestore.service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {

  constructor(
    public modalController: ModalController,
    public firestoreService: FirestoreService,
    public toastController: ToastController,
    public alertController: AlertController
  ) { }

  @Input() id: string;
  @Input() name: any;
  @Input() price: any;
  @Input() category: any;
  @Input() insumos: any;

  newProduct: Producto = {
    id: this.firestoreService.getId(),
    name: '',
    category: '',
    price: null,
    insumos: []
  };

  ngOnInit() {
    this.newProduct = {
      id: this.id,
      name: this.name,
      category: this.category,
      price: this.price,
      insumos: this.insumos
    }
    console.log(this.newProduct)
  }

  dismissModal(){
    this.modalController.dismiss({});
  }

  saveData() {
    console.log(this.newProduct);

    let flag: number = 1;

    if (this.newProduct.name != '' && this.newProduct.category != '' && this.newProduct.price != null) {
      for(let item in this.newProduct.insumos) {
        if (this.newProduct.insumos[item].quantity != null) {
          flag = flag + 1;
        } else if (this.newProduct.insumos[item].quantity == null) {
          flag = flag * 0;
        }
      }
      if (flag > 1) {
        this.firestoreService.updateProduct(this.newProduct, 'Productos/', this.newProduct.id).then(response => {
          this.presentToast('Producto actualizado satisfactoriamente.');
          this.dismissModal();
        });
      } else if (flag == 0) {
        this.presentAlert('Para guardar los cambios es necesario llenar los campos para los insumos.');
      }
    } else {
      this.presentAlert('Para guardar los cambios es necesario llenar todos los campos.');
    }
    

  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: message,
      buttons: ['Aceptar']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}

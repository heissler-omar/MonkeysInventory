import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from 'src/app/Services/firestore.service';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {

  constructor(
    public modalController: ModalController, 
    public alertController: AlertController,
    public firestoreService: FirestoreService,
    public toastController: ToastController
  ) { }

  @Input() id: string;
  @Input() name: any;
  @Input() price: any;
  @Input() category: any;
  @Input() insumos: any;

  ngOnInit() {
    console.log(this.insumos)
  }

  dismissModal() {
    this.modalController.dismiss({});
  }

  async presentModalEditProduct() {
    const modal = await this.modalController.create({
      component: EditProductComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar producto',
      message: '¿Estás seguro(a) de querer elimnar el producto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            this.deleteProduct();
            this.dismissModal();
          }
        }
      ]
    });

    await alert.present();
  }

  test() {
    this.firestoreService.getProduct('Productos/', this.id).subscribe(response => {
      console.log(response)
    })
  }

  deleteProduct() {
    // let product: any;
    // this.firestoreService.getProduct('Productos/', this.id).subscribe(response => {
    //   product = response;
    // });
    // let insumos: [] = product.insumos;
    console.log(this.insumos);

    for(let item in this.insumos) {
      this.insumos[item].assignments = this.insumos[item].assignments - 1;
      if (this.insumos[item].assignments == 0) {
        this.insumos[item].isAssigned = false;
      }
      this.firestoreService.updateInsumo(this.insumos[item], 'Insumos/', this.insumos[item].id);
    }


    this.firestoreService.deleteProduct('Productos/', this.id).then(response => {
      this.presentToast('Producto eliminado satisfactoriamente.');
    })
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}

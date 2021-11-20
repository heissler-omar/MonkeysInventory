import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from 'src/app/Services/firestore.service';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { ToastController } from '@ionic/angular';
import { Insumo } from 'src/app/Models/insumos.interface';

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

  insumosCollection: Insumo[] = [];

  ngOnInit() {
    console.log(this.insumos)
    this.firestoreService.getInsumosCollection<Insumo>('Insumos/').subscribe(response => {
      this.insumosCollection = response;
    });
  }

  dismissModal() {
    this.modalController.dismiss({});
  }

  async presentModalEditProduct() {
    const modal = await this.modalController.create({
      component: EditProductComponent,
      componentProps: {
        id: this.id,
        name: this.name,
        price: this.price,
        category: this.category,
        insumos: this.insumos
      },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar producto',
      message: '¿Estás seguro(a) de querer elimnar el producto: ' + '<strong>'+ this.name + '</strong>?',
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
            this.deleteProduct1();
            this.deleteProduct2();
            this.dismissModal();
          }
        }
      ]
    });

    await alert.present();
  }

  deleteProduct1() {
    for(let item in this.insumos) {
      this.insumosCollection.forEach(element => {
        if (this.insumos[item].id == element.id) {
          element.assignments = element.assignments - 1;
          if (element.assignments == 0) {
            element.isAssigned = false;
          }
          this.firestoreService.updateInsumo(element, 'Insumos/', element.id);
        }
      });
    }

  }

  deleteProduct2() {
    console.log('Listo');
    
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

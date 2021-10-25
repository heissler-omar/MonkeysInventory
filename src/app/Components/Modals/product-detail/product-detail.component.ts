import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {

  constructor(public modalController: ModalController, public alertController: AlertController) { }

  ngOnInit() {}

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
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

}

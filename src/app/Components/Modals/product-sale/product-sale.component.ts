import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-product-sale',
  templateUrl: './product-sale.component.html',
  styleUrls: ['./product-sale.component.scss'],
})
export class ProductSaleComponent implements OnInit {

  constructor(public modalController: ModalController, public alertController: AlertController) { }

  number = 1;

  ngOnInit() {}

  dismissModal() {
    this.modalController.dismiss({});
  }

  addition() {
    if (this.number >= 1) {
      this.number = this.number + 1;
    }
  }
  substraction() {
    if (this.number > 1) {
      this.number = this.number - 1;
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Vender',
      message: '¿Estás seguro(a) de realizar la venta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Vender',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateProductComponent } from '../Components/Modals/create-product/create-product.component';
import { ProductsTableComponent } from '../Components/Modals/products-table/products-table.component';
import { AlertController } from '@ionic/angular';
import { ProductDetailComponent } from '../Components/Modals/product-detail/product-detail.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  constructor(public modalController: ModalController, public alertController: AlertController) {}


  ngOnInit() {
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CreateProductComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async presentModalTable() {
    const modal = await this.modalController.create({
      component: ProductsTableComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async presentModalProductDetail() {
    const modal = await this.modalController.create({
      component: ProductDetailComponent,
      cssClass: 'productDetailModal'
    });
    return await modal.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Descargar Excel',
      message: '¿Deseas exportar el inventario de productos en formato Excel?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

}

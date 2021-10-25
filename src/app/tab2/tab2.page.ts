import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductSaleComponent } from '../Components/Modals/product-sale/product-sale.component';
import { SalesHistoryComponent } from '../Components/Modals/sales-history/sales-history.component';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public modalController: ModalController) {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: SalesHistoryComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  async presentModalProductSale() {
    const modal = await this.modalController.create({
      component: ProductSaleComponent,
      cssClass: 'productSaleModal'
    });
    return await modal.present();
  }

}

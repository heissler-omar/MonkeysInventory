import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateInsumoComponent } from '../Components/Modals/create-insumo/create-insumo.component';
import { PopoverController } from '@ionic/angular';
import { InsumoDetailComponent } from '../Components/Popovers/insumo-detail/insumo-detail.component';
import { InsumosTableComponent } from '../Components/Modals/insumos-table/insumos-table.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public modalController: ModalController, public popoverController: PopoverController) {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: CreateInsumoComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async presentModalTable() {
    const modal = await this.modalController.create({
      component: InsumosTableComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: InsumoDetailComponent,
      cssClass: 'popInsumoDetail',
      event: ev,
      mode: "ios"
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}

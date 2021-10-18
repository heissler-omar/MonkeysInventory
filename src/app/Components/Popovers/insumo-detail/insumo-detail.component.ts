import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditInsumoComponent } from '../../Modals/edit-insumo/edit-insumo.component';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-insumo-detail',
  templateUrl: './insumo-detail.component.html',
  styleUrls: ['./insumo-detail.component.scss'],
})
export class InsumoDetailComponent implements OnInit {

  constructor(public modalController: ModalController, public alertController: AlertController) { }

  ngOnInit() {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: EditInsumoComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¿Estás seguro(a) de querer eliminar el insumo?',
      buttons: ['Cancelar', 'Eliminar']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}

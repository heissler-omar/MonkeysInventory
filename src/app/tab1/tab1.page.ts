import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateInsumoComponent } from '../Components/Modals/create-insumo/create-insumo.component';
import { PopoverController } from '@ionic/angular';
import { InsumoDetailComponent } from '../Components/Popovers/insumo-detail/insumo-detail.component';
import { InsumosTableComponent } from '../Components/Modals/insumos-table/insumos-table.component';
import { AlertController } from '@ionic/angular';
import { DetailInsumoComponent } from '../Components/Modals/detail-insumo/detail-insumo.component';
import { FirestoreService } from '../Services/firestore.service';
import { Insumo } from 'src/app/Models/insumos.interface';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(
    public modalController: ModalController, 
    public popoverController: PopoverController,
    public alertController: AlertController,
    public firestoreService: FirestoreService
  ) {}

  insumos: Insumo[] = [];
  insumoId: string;
  name: string;
  quantity: number;
  unit: string;
  isAssigned: boolean;

  ngOnInit() {
    this.getInsumos();
  }

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

  async presentModalDetailInsumo() {
    const modal = await this.modalController.create({
      component: DetailInsumoComponent,
      cssClass: 'modalDetailInsumo'
    });
    return await modal.present();
  }
  
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: InsumoDetailComponent,
      componentProps: {
        id: this.insumoId,
        name: this.name,
        quantity: this.quantity,
        unit: this.unit,
        isAssigned: this.isAssigned
      },
      cssClass: 'popInsumoDetail',
      event: ev,
      mode: "ios"
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Descargar Excel',
      message: '¿Deseas exportar el inventario de insumos en formato Excel?',
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


  /* Servicios */

  getInsumos() {
    this.firestoreService.getInsumosCollection<Insumo>('Insumos/').subscribe(response => {
      console.log(response);
      this.insumos = response;
    });
  }

  getData(insumo) {
    this.insumoId = insumo.id;
    this.name = insumo.name;
    this.quantity = insumo.quantity;
    this.unit = insumo.unit;
    this.isAssigned = insumo.isAssigned;
  }

  


}

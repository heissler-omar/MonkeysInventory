import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { EditInsumoComponent } from '../../Modals/edit-insumo/edit-insumo.component';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from 'src/app/Services/firestore.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-insumo-detail',
  templateUrl: './insumo-detail.component.html',
  styleUrls: ['./insumo-detail.component.scss'],
})
export class InsumoDetailComponent implements OnInit {

  @Input() id: string;
  @Input() name: string;
  @Input() quantity: number;
  @Input() unit: string;
  @Input() isAssigned: boolean;

  constructor(
    public modalController: ModalController,
    public alertController: AlertController,
    public popoverController: PopoverController,
    public firestoreService: FirestoreService,
    public toastController: ToastController
  ) { }

  ngOnInit() {}

  dismiss() {
    this.popoverController.dismiss({});
  }

  async presentModalEditInsumo() {
    const modal = await this.modalController.create({
      component: EditInsumoComponent,
      componentProps: {
        id: this.id,
        name: this.name,
        quantity: this.quantity,
        unit: this.unit,
        isAssigned: this.isAssigned
      },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar Insumo',
      message: '¿Estás seguro(a) de querer eliminar el insumo: ' + '<strong>'+ this.name + '</strong>?',
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
            this.firestoreService.deleteInsumo('Insumos/', this.id).then(response => {
              this.presentToast('Insumo eliminado exitosamente.');
            }).catch(response => {
              this.presentToast('El insumo no se pudo eliminar');
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}

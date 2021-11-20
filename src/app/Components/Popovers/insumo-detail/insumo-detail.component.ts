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
  @Input() assignments: number;

  constructor(
    public modalController: ModalController,
    public alertController: AlertController,
    public popoverController: PopoverController,
    public firestoreService: FirestoreService,
    public toastController: ToastController
  ) { }

  status: string;

  ngOnInit() {
    if (this.isAssigned == true) {
      this.status = 'Sí'
    } else if (this.isAssigned == false) {
      this.status = 'No'
    }
  }

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
        isAssigned: this.isAssigned,
        assignments: this.assignments
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
            this.deleteInsumo();
          }
        }
      ]
    });

    await alert.present();
  }

  deleteInsumo(){
    if (this.isAssigned == false) {
      this.firestoreService.deleteInsumo('Insumos/', this.id).then(response => {
        this.presentToast('Insumo eliminado satisfactoriamente.');
      }).catch(response => {
        this.presentToast('El insumo no se pudo eliminar');
      });
    } else if (this.isAssigned == true) {
      this.presentAlert();
    }
    
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminación de insumo',
      message: 'No se puede eliminar el insumo porque está asignado a uno o más productos.',
      buttons: ['Aceptar']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}

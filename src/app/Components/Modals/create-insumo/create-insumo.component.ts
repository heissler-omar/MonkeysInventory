import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Insumo } from 'src/app/Models/insumos.interface';
import { FirestoreService } from 'src/app/Services/firestore.service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-create-insumo',
  templateUrl: './create-insumo.component.html',
  styleUrls: ['./create-insumo.component.scss'],
})
export class CreateInsumoComponent implements OnInit {

  constructor(
    public modalController: ModalController,
    public firestoreService: FirestoreService,
    public toastController: ToastController,
    public alertController: AlertController
  ) {}

  private path = 'Insumos/';

  newInsumo: Insumo = {
    id: this.firestoreService.getId(),
    name: '',
    quantity: null,
    unit: '',
    isAssigned: false,
    assignments: 0
  };

  ngOnInit() {}

  dismissModal(){
    this.modalController.dismiss({});
  }

  createInsumo() {
    if (this.newInsumo.name != '' && this.newInsumo.quantity != null && this.newInsumo.unit != '') {
      this.firestoreService.createInsumo(this.newInsumo, this.path, this.newInsumo.id).then(response => {
        this.presentToast('Insumo creado exitosamente.');
      }).catch(error => {
        this.presentToast('El insumo no fue creado.');
      });
  
      this.newInsumo = {
        id: this.firestoreService.getId(),
        name: '',
        quantity: null,
        unit: '',
        isAssigned: false,
        assignments: 0
      };
    } else {
      this.presentAlert();
    }
    
  }

  async presentToast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: 'Para crear el insumo debes llenar todos los campos.',
      buttons: ['Aceptar']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  }

}

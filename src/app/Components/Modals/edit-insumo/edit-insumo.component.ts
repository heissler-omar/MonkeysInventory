import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Insumo } from 'src/app/Models/insumos.interface';
import { FirestoreService } from 'src/app/Services/firestore.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-insumo',
  templateUrl: './edit-insumo.component.html',
  styleUrls: ['./edit-insumo.component.scss'],
})
export class EditInsumoComponent implements OnInit {

  constructor(
    public modalController: ModalController,
    public firestoreService: FirestoreService,
    public toastController: ToastController
    ) { }

  @Input() id: string;
  @Input() name: string;
  @Input() quantity: number;
  @Input() unit: string;
  @Input() isAssigned: boolean;
  @Input() assignments: number;

  newInsumo: Insumo = {
    id: '',
    name: '',
    quantity: null,
    unit: '',
    isAssigned: false,
    assignments: 0
  };

  ngOnInit() {
    this.newInsumo = {
      id: this.id,
      name: this.name,
      quantity: this.quantity,
      unit: this.unit,
      isAssigned: this.isAssigned,
      assignments: this.assignments
    }
  }

  dismissModal(){
    this.modalController.dismiss({});
  }

  updateInsumo() {
    this.firestoreService.updateInsumo(this.newInsumo, 'Insumos/', this.id).then(response => {
      this.presentToast('Insumo editado exitosamente.');
    }).catch(response => {
      this.presentToast('El insumo no se pudo editar.');
    });
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}

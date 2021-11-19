import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from 'src/app/Services/firestore.service';
import { Venta } from 'src/app/Models/ventas.interface';

@Component({
  selector: 'app-sales-history',
  templateUrl: './sales-history.component.html',
  styleUrls: ['./sales-history.component.scss'],
})
export class SalesHistoryComponent implements OnInit {

  constructor(
    public modalController: ModalController, 
    public alertController: AlertController,
    public firestoreService: FirestoreService
  ) { }

  date: any;

  ventas: Venta[] = [];

  ngOnInit() {
    this.date = new Date().toLocaleString();

    this.firestoreService.getSalesCollection<Venta>('Ventas/').subscribe(response => {
      this.ventas = response;
      console.log(this.ventas);
      
    });
  }

  dismissModal() {
    this.modalController.dismiss({});
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Exportar historial de ventas',
      message: '¿Deseas exportar el historial de ventas en formato Excel?',
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

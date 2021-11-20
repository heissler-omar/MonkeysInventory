import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from 'src/app/Services/firestore.service';
import { Venta } from 'src/app/Models/ventas.interface';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as moment from 'moment';

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
            this.downloadExcel();
          }
        }
      ]
    });

    await alert.present();
  }

  downloadExcel() {
    //create new excel work book
    let workbook = new Workbook();
    //add name to sheet
    let worksheet = workbook.addWorksheet("Historial de ventas");
    //add column name

    worksheet.columns = [
      {width: 18.5},
      {width: 12}
    ]

    let header = ["Fecha", "Producto", "Cantidad", "Precio"]
    let headerRow = worksheet.addRow(header);

    headerRow.font = {
      bold: true
    }

    for (let item of this.ventas) {
      let temp = [];
      temp.push(item.date, item.product, item.quantity, item.price)
      worksheet.addRow(temp)
    }

    //set downloadable file name
    let fname = "Historial de ventas"

    //add data and file name and download
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname + ' - ' + moment(new Date()).format('DD-MM-YYYY') + '.xlsx');
    });
  }

}

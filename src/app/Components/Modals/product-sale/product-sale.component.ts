import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from 'src/app/Services/firestore.service';
import { Venta } from 'src/app/Models/ventas.interface';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-product-sale',
  templateUrl: './product-sale.component.html',
  styleUrls: ['./product-sale.component.scss'],
})
export class ProductSaleComponent implements OnInit {

  constructor(
    public modalController: ModalController, 
    public alertController: AlertController,
    public firestoreService: FirestoreService,
    public toastController: ToastController
  ) { }

  @Input() id: string;
  @Input() name: string;
  @Input() category: string;
  @Input() price: number;
  @Input() insumos: any;

  number = 1;
  originalInsumos = [];
  newSale: Venta = {
    id: this.firestoreService.getId(),
    date: null,
    product: '',
    quantity: null,
    price: null
  }

  ngOnInit() {
    for(let item in this.insumos){
      this.firestoreService.getInsumo('Insumos/', this.insumos[item].id).subscribe(response => {
        let res = response;
        this.originalInsumos.push(res);
      })
    }

  }

  dismissModal() {
    this.modalController.dismiss({});
  }

  addition() {
    if (this.number >= 1) {
      this.number = this.number + 1;
    }
  }
  substraction() {
    if (this.number > 1) {
      this.number = this.number - 1;
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Vender',
      message: '¿Estás seguro(a) de realizar la venta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Vender',
          handler: () => {
            console.log('Confirm Okay');
            this.sellProduct();
          }
        }
      ]
    });

    await alert.present();
  }


  sellProduct() {
    /* Se están eliminando objetos con id duplicada en el array originalInsumos */
    const obj = {};

    for(let i = 0, len = this.originalInsumos.length; i < len; i++){
      obj[this.originalInsumos[i]['id']] = this.originalInsumos[i];
    }

    let originInsumos = new Array();

    for(let key in obj) {
      originInsumos.push(obj[key]);
    }
    /* ------------------------------------------------------------------------ */

    let flag: number = 1;

    for(let item in this.insumos) {
      let quantityToSub = (this.insumos[item].quantity) * this.number;
      originInsumos[item].quantity = originInsumos[item].quantity - quantityToSub;
      console.log('cantidad: ',originInsumos[item].quantity)
      if (originInsumos[item].quantity >= 0) {
        console.log('hay insumos');
        flag = flag + 1;
        
      } else if (originInsumos[item].quantity < 0) {
        console.log('no hay insumos');
        flag = flag * 0;
      }
      this.firestoreService.updateInsumo(originInsumos[item], 'Insumos/', originInsumos[item].id);
    }

    if (flag >= 1) {
      this.newSale.date = new Date().toLocaleString();
      this.newSale.product = this.name;
      this.newSale.quantity = this.number;
      this.newSale.price = this.price * this.number;

      this.firestoreService.createSale(this.newSale, 'Ventas/', this.newSale.id).then(response => {
        this.presentToast('La venta se ha realizado satisfactoriamente.');
        this.dismissModal();
      });

    } else if (flag == 0) {
      this.presentAlert();
    }

    
    
  }

  async presentToast(message: string) {
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
      message: 'No existen suficientes insumos para realizar la venta.',
      buttons: ['Aceptar']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}

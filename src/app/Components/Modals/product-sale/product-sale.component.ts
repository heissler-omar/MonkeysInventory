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
    console.log(this.insumos);
    for(let item in this.insumos){
      this.firestoreService.getInsumo('Insumos/', this.insumos[item].id).subscribe(response => {
        let res = response;
        this.originalInsumos.push(res);
      })
      console.log('Originales: ', this.originalInsumos);
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

  ngDocheck(){
    console.log(this.insumo)
  }

  insumo= [];

  sellProduct() {
    console.log('Insumos: ', this.insumos);
    
    console.log('Original: ',this.originalInsumos);
    /* Se están eliminando objetos con id duplicada en el array originalInsumos */
    const obj = {};

    for(let i = 0, len = this.originalInsumos.length; i < len; i++){
      obj[this.originalInsumos[i]['id']] = this.originalInsumos[i];
    }

    let originInsumos = new Array();

    for(let key in obj) {
      originInsumos.push(obj[key]);
    }

    console.log('Sin duplicados: ',originInsumos);
    /* ------------------------------------------------------------------------ */


    for(let item in this.insumos) {
      let quantityToSub = (this.insumos[item].quantity) * this.number;
      originInsumos[item].quantity = originInsumos[item].quantity - quantityToSub;
      this.firestoreService.updateInsumo(originInsumos[item], 'Insumos/', originInsumos[item].id)
    }

    console.log('Array con restas: ', originInsumos);


    this.newSale.date = new Date().toLocaleString();;
    this.newSale.product = this.name;
    this.newSale.quantity = this.number;
    this.newSale.price = this.price * this.number;

    console.log(this.newSale);
    

    this.firestoreService.createSale(this.newSale, 'Ventas/', this.newSale.id).then(response => {
      this.presentToast('Venta satisfactoria.');
      this.dismissModal();
    })
    
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}

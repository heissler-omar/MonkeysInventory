import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateProductComponent } from '../Components/Modals/create-product/create-product.component';
import { ProductsTableComponent } from '../Components/Modals/products-table/products-table.component';
import { AlertController } from '@ionic/angular';
import { ProductDetailComponent } from '../Components/Modals/product-detail/product-detail.component';
import { FirestoreService } from '../Services/firestore.service';
import { Producto } from 'src/app/Models/products.interface';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as moment from 'moment';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  constructor(
    public modalController: ModalController, 
    public alertController: AlertController,
    public firestoreService: FirestoreService
  ) {}

  products: Producto[] = [];
  id: string;
  name: any;
  price: any;
  category: any;
  insumos = [];
  status: string;
  textToSearch = '';
  keyToFilter = 'name';

  ngOnInit() {
    this.getProducts();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CreateProductComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async presentModalTable() {
    const modal = await this.modalController.create({
      component: ProductsTableComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async presentModalProductDetail() {
    const modal = await this.modalController.create({
      component: ProductDetailComponent,
      componentProps: {
        id: this.id,
        name: this.name,
        price: this.price,
        category: this.category,
        insumos: this.insumos
      },
      cssClass: 'productDetailModal'
    });
    return await modal.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Descargar Excel',
      message: '¿Deseas exportar el inventario de productos en formato Excel?',
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


  getProducts(){
    // this.products.length = null;
    this.firestoreService.getProductsCollection<Producto>('Productos/').subscribe(products => {
      this.status = 'waiting';
      this.products = products;

      if (this.products.length == 0) {
        this.status = 'without data';
      } else if (this.products.length > 0) {
        this.status = 'with data';
      }
    });
    console.log(this.products);
  }

  getProductData(product){
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
    this.category = product.category;
    this.insumos = product.insumos;
  }

  search(event) {
    this.textToSearch = event.detail.value;
  }

  filterByValue(key: string, value: string) {
    this.keyToFilter = key;
    this.textToSearch = value;
  }

  downloadExcel() {
    //create new excel work book
    let workbook = new Workbook();
    //add name to sheet
    let worksheet = workbook.addWorksheet("Inventario de productos");
    //add column name

    worksheet.columns = [
      {width: 16}
    ]

    let header = ["Nombre", "Categoría", "Precio"]
    let headerRow = worksheet.addRow(header);

    headerRow.font = {
      bold: true
    }

    for (let item of this.products) {
      let temp = [];
      temp.push(item.name, item.category, item.price)
      worksheet.addRow(temp)
    }

    //set downloadable file name
    let fname = "Inventario de productos"

    //add data and file name and download
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname + ' ' + moment(new Date()).format('DD-MM-YYYY') + '.xlsx');
    });
  }

}

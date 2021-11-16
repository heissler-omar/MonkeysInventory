import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateProductComponent } from '../Components/Modals/create-product/create-product.component';
import { ProductsTableComponent } from '../Components/Modals/products-table/products-table.component';
import { AlertController } from '@ionic/angular';
import { ProductDetailComponent } from '../Components/Modals/product-detail/product-detail.component';
import { FirestoreService } from '../Services/firestore.service';
import { Producto } from 'src/app/Models/products.interface';

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

}

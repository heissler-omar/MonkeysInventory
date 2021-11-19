import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductSaleComponent } from '../Components/Modals/product-sale/product-sale.component';
import { SalesHistoryComponent } from '../Components/Modals/sales-history/sales-history.component';
import { FirestoreService } from '../Services/firestore.service';
import { Producto } from 'src/app/Models/products.interface';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(
    public modalController: ModalController,
    public firestoreService: FirestoreService
  ) {}

  productos: Producto[] = [];
  status: any;

  id: string;
  name: string;
  category: string;
  price: number;
  insumos: any;

  ngOnInit() {
    this.firestoreService.getProductsCollection<Producto>('Productos/').subscribe(response => {
      this.status = 'waiting';
      this.productos = response;

      if (this.productos.length == 0) {
        this.status = 'empty';
      } else if (this.productos.length > 0) {
        this.status = 'full';
      }
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SalesHistoryComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  async presentModalProductSale() {
    const modal = await this.modalController.create({
      component: ProductSaleComponent,
      componentProps: {
        id: this.id,
        name: this.name,
        category: this.category,
        price: this.price,
        insumos: this.insumos
      },
      cssClass: 'productSaleModal'
    });
    return await modal.present();
  }


  getData(product) {
    this.id = product.id;
    this.name = product.name;
    this.category = product.category;
    this.price = product.price;
    this.insumos = product.insumos;
  }

}

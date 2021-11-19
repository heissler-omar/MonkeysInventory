import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/Services/firestore.service';
import { Producto } from 'src/app/Models/products.interface';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
})
export class ProductsTableComponent implements OnInit {

  constructor(
    public modalController: ModalController,
    public firestoreService: FirestoreService
  ) { }

  products: Producto[] = [];

  ngOnInit() {
    this.firestoreService.getProductsCollection<Producto>('Productos/').subscribe(response => {
      this.products = response;
    });
  }

  dismissModal(){
    this.modalController.dismiss({});
  }

}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
})
export class ProductsTableComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  dismissModal(){
    this.modalController.dismiss({});
  }

}

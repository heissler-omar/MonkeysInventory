import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-insumos-table',
  templateUrl: './insumos-table.component.html',
  styleUrls: ['./insumos-table.component.scss'],
})
export class InsumosTableComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  dismissModal(){
    this.modalController.dismiss({});
  }

}

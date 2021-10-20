import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detail-insumo',
  templateUrl: './detail-insumo.component.html',
  styleUrls: ['./detail-insumo.component.scss'],
})
export class DetailInsumoComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  dismissModal() {
    this.modalController.dismiss({});
  }

}

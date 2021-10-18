import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-insumo',
  templateUrl: './create-insumo.component.html',
  styleUrls: ['./create-insumo.component.scss'],
})
export class CreateInsumoComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  dismissModal(){
    this.modalController.dismiss({});
  }

}

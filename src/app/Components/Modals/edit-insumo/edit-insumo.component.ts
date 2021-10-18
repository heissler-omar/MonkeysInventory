import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-insumo',
  templateUrl: './edit-insumo.component.html',
  styleUrls: ['./edit-insumo.component.scss'],
})
export class EditInsumoComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  dismissModal(){
    this.modalController.dismiss({});
  }

}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/Services/firestore.service';
import { Insumo } from 'src/app/Models/insumos.interface';

@Component({
  selector: 'app-insumos-table',
  templateUrl: './insumos-table.component.html',
  styleUrls: ['./insumos-table.component.scss'],
})
export class InsumosTableComponent implements OnInit {

  constructor(
    public modalController: ModalController,
    public firestoreService: FirestoreService
  ) { }

  insumos: Insumo[] = []

  ngOnInit() {
    this.getInsumos();
  }

  dismissModal(){
    this.modalController.dismiss({});
  }

  getInsumos() {
    this.firestoreService.getInsumosCollection<Insumo>('Insumos/').subscribe(response => {
      console.log('Insumos table');
      this.insumos = response;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FirestoreService } from 'src/app/Services/firestore.service';
import { Insumo } from 'src/app/Models/insumos.interface';
import { Producto } from 'src/app/Models/products.interface';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {

  constructor(
    public modalController: ModalController,
    public firestoreService: FirestoreService,
    public toastController: ToastController
  ) { }

  insumos: Insumo[] = []

  private path = 'Productos/';
  newProduct: Producto = {
    id: this.firestoreService.getId(),
    name: '',
    category: '',
    price: null,
    insumos: []
  };

  insumosArray = [];
  insumosName = []


  dropdownList = [];
  // selectedItems = [];
  dropdownSettings: IDropdownSettings;

  selectedInsumos = []

  ngOnInit() {
    this.getInsumos();

    // this.dropdownList = [
    //   { item_id: 'AbZXKQCpMQJQv79WZxRD', item_text: 'Café' },
    //   { item_id: 'AbZXKQCpMQJQv79WZxRD', item_text: 'Leche' },
    //   { item_id: 'AbZXKQCpMQJQv79WZxRD', item_text: 'Leche espumada' },
    //   { item_id: 'AbZXKQCpMQJQv79WZxRD', item_text: 'Espresso' },
    //   { item_id: 'AbZXKQCpMQJQv79WZxRD', item_text: 'Chai' },
    //   { item_id: 'AbZXKQCpMQJQv79WZxRD', item_text: 'Azucar' },
    //   { item_id: 'AbZXKQCpMQJQv79WZxRD', item_text: 'Jarabe' }
    // ];
    // this.selectedItems = [
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' }
    // ];
    var array = ['asdfasdf', 'asdfasfd']

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      enableCheckAll: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true,
      maxHeight: 200,
      searchPlaceholderText: 'Buscar'
    };

    console.log(this.selectedInsumos)
  }

 
  onItemSelect(item: any) {
    // console.log(item);
    this.selectedInsumos.push({name: item.item_text, id: item.item_id, quantity: null, isAssigned: true});
    console.log('Array: ', this.selectedInsumos);
  }
  onItemDeSelect(items: any) {
    // console.log(items);
    const index = this.selectedInsumos.map(function(e) { return e.id; }).indexOf(items.item_id);
    console.log('Index: ', index)
    if (index > -1) {
      this.selectedInsumos.splice(index, 1);
      this.insumosArray.splice(index, 1);
    }
    console.log('Remove array: ', this.selectedInsumos);
  }

  dismissModal(){
    this.modalController.dismiss({});
  }

  /*Servicios*/

  getInsumos() {
    this.firestoreService.getInsumosCollection<Insumo>('Insumos/').subscribe(response => {
      console.log('Nuevo array: ', response);
      this.insumos = response;
    });

    this.firestoreService.getInsumosCollection<Insumo>('Insumos/').subscribe(response => {
      if (this.insumos.length != 0) {
        console.log('Array lleno');
      } else if (this.insumos.length == 0) {
        console.log('Array vacío');
      }

      for(var insumo of this.insumos) {
        this.dropdownList.push({item_id: insumo.id, item_text: insumo.name, unit: insumo.unit})
      }

      console.log('Lista: ', this.dropdownList);

    });

  }

  createProduct() {
    this.firestoreService.createProduct(this.newProduct, this.path, this.newProduct.id).then(response => {
      this.presentToast('Producto creado exitosamente.');
    }).catch(error => {
      this.presentToast('El producto no fue creado.');
    });

    for(let item of this.newProduct.insumos) {
      // console.log('Insumos ind: ', item)

      delete item.name;
      delete item.quantity;

      console.log('Nuevo: ', item)

      this.firestoreService.updateInsumo(item, 'Insumos/', item.id);
    }


    this.dismissModal();

  }

  async presentToast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  test(){

    for(let item in this.insumosArray) {
      this.selectedInsumos[item].quantity = this.insumosArray[item]
    }

    this.newProduct.insumos = this.selectedInsumos

    console.log('Final: ',this.newProduct)
  }


}

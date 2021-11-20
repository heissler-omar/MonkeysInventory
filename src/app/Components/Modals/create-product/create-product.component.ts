import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FirestoreService } from 'src/app/Services/firestore.service';
import { Insumo } from 'src/app/Models/insumos.interface';
import { Producto } from 'src/app/Models/products.interface';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {

  constructor(
    public modalController: ModalController,
    public firestoreService: FirestoreService,
    public toastController: ToastController,
    public alertController: AlertController
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

  dropdownList = [];
  dropdownSettings: IDropdownSettings;

  selectedInsumos = [];
  selectedInsumosWithUnit = [];

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
    // console.log('Item:', item);

    this.selectedInsumos.push({name: item.item_text, id: item.item_id, quantity: null, isAssigned: true, unit: '', assignments: null});

    for(let item in this.selectedInsumos) {
      this.insumos.map(element => {
        if (this.selectedInsumos[item].id == element.id) {
          this.selectedInsumos[item].unit = element.unit;
          this.selectedInsumos[item].assignments = element.assignments;
        }
      });
    }

    console.log('selectedInsumos: ', this.selectedInsumos);
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
        this.dropdownList.push({item_id: insumo.id, item_text: insumo.name})
      }

      console.log('Lista: ', this.dropdownList);

    });

  }

  createProduct() {
    let flag: number = 1;
    let flag2: boolean = false;

    if (this.newProduct.name != '' && this.newProduct.category != '' && this.newProduct.price != null && this.newProduct.insumos.length != 0) {

      for(let item in this.newProduct.insumos) {
        if (this.newProduct.insumos[item].quantity != null) {
          this.newProduct.insumos[item].assignments = this.newProduct.insumos[item].assignments + 1;
          flag = flag + 1; 
        } else {
          flag = flag * 0;
        }
      }

      if (flag > 1) {
        console.log('Array 1: ', this.newProduct.insumos);

        this.firestoreService.createProduct(this.newProduct, this.path, this.newProduct.id).then(response => {
          this.presentToast('Producto creado satisfactoriamente.');
        }).catch(error => {
          this.presentToast('El producto no fue creado.');
        });
        flag2 = true;

      } else if (flag == 0) {
        this.presentAlert('Para crear el producto se deben configurar los insumos.');
      }

      if (flag2 == true) {
        let insumoToUpdate = {
          id: '',
          assignments: null,
          isAssigned: null
        }
    
        for(let item in this.newProduct.insumos) {
          insumoToUpdate.id = this.newProduct.insumos[item].id;
          insumoToUpdate.assignments = this.newProduct.insumos[item].assignments;
          insumoToUpdate.isAssigned = this.newProduct.insumos[item].isAssigned;
    
          this.firestoreService.updateInsumo(insumoToUpdate, 'Insumos/', insumoToUpdate.id);
        }
    
        this.dismissModal();
      }
  
     
    } else {
      this.presentAlert('Para crear el producto se deben llenar todos los campos.');
    }

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

    this.newProduct.insumos = this.selectedInsumos;

    console.log('Final: ',this.newProduct)
    
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: message,
      buttons: ['Aceptar']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  }

}

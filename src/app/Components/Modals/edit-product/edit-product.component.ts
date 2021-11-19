import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  @Input() id: string;
  @Input() name: any;
  @Input() price: any;
  @Input() category: any;
  @Input() insumos: any;

  dropdownList = [];
  // selectedItems = [];
  dropdownSettings:IDropdownSettings;

  selectedInsumos = []

  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Café' },
      { item_id: 2, item_text: 'Leche' },
      { item_id: 3, item_text: 'Leche espumada' },
      { item_id: 4, item_text: 'Espresso' },
      { item_id: 6, item_text: 'Chai' },
      { item_id: 7, item_text: 'Azucar' },
      { item_id: 8, item_text: 'Jarabe' }
    ];
    // this.selectedItems = [
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' }
    // ];
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
    this.selectedInsumos.push({name: item.item_text});
    console.log('Array: ', this.selectedInsumos);
  }
  onItemDeSelect(items: any) {
    console.log(items);
    const index = this.selectedInsumos.map(function(e) { return e.name; }).indexOf(items.item_text);
    console.log(index)
    if (index > -1) {
      this.selectedInsumos.splice(index, 1);
    }
    console.log('Remove array: ', this.selectedInsumos);
  }

  dismissModal(){
    this.modalController.dismiss({});
  }

}

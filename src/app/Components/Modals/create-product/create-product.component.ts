import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  dropdownList = [];
  // selectedItems = [];
  dropdownSettings:IDropdownSettings;

  selectedInsumos = [];

  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 6, item_text: 'New 6' },
      { item_id: 7, item_text: 'New 7' },
      { item_id: 8, item_text: 'New 8' },
      { item_id: 9, item_text: 'New 9' },
      { item_id: 10, item_text: 'New 10' }
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

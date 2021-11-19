import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { CreateInsumoComponent } from './Modals/create-insumo/create-insumo.component';
import { CreateProductComponent } from './Modals/create-product/create-product.component';
import { EditInsumoComponent } from './Modals/edit-insumo/edit-insumo.component';
import { EditProductComponent } from './Modals/edit-product/edit-product.component';
import { InsumosTableComponent } from './Modals/insumos-table/insumos-table.component';
import { InsumoDetailComponent } from './Popovers/insumo-detail/insumo-detail.component';
import { ProductDetailComponent } from './Modals/product-detail/product-detail.component';
import { ProductSaleComponent } from './Modals/product-sale/product-sale.component';
import { ProductsTableComponent } from './Modals/products-table/products-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SalesHistoryComponent } from './Modals/sales-history/sales-history.component';



@NgModule({
  declarations: [
    CreateInsumoComponent,
    CreateProductComponent,
    EditInsumoComponent,
    InsumosTableComponent,
    InsumoDetailComponent,
    EditProductComponent,
    ProductDetailComponent,
    ProductSaleComponent,
    ProductsTableComponent,
    SalesHistoryComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CreateInsumoComponent,
    CreateProductComponent,
    EditInsumoComponent,
    InsumosTableComponent,
    InsumoDetailComponent,
    EditProductComponent,
    ProductDetailComponent,
    ProductSaleComponent,
    ProductsTableComponent,
    SalesHistoryComponent
  ]
})
export class ComponentsModule { }

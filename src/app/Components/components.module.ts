import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateInsumoComponent } from './Modals/create-insumo/create-insumo.component';
import { CreateProductComponent } from './Modals/create-product/create-product.component';
import { EditInsumoComponent } from './Modals/edit-insumo/edit-insumo.component';
import { InsumosTableComponent } from './Modals/insumos-table/insumos-table.component';
import { InsumoDetailComponent } from './Popovers/insumo-detail/insumo-detail.component';
import { IonicModule } from '@ionic/angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [
    CreateInsumoComponent,
    CreateProductComponent,
    EditInsumoComponent,
    InsumosTableComponent,
    InsumoDetailComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
  ],
  exports: [
    CreateInsumoComponent,
    CreateProductComponent,
    EditInsumoComponent,
    InsumosTableComponent,
    InsumoDetailComponent
  ]
})
export class ComponentsModule { }

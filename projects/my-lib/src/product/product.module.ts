import { NgModule } from '@angular/core';
import {GeneralModule, SharedModule} from '@sgxbz/shared';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { UnitListComponent} from './unit/unit-list.component';
import { UnitEditComponent } from './unit/unit-edit.component';
import { UnitDeleteComponent } from './unit/unit-delete.component';
import { UnitAddComponent } from './unit/unit-add.component';
import { UnitViewComponent } from './unit/unit-view.component';
import { UnitSelectComponent } from './unit/unit-select.component';
import { ItemTypeListComponent } from './item-type/item-type-list.component';
import { ItemTypeEditComponent } from './item-type/item-type-edit.component';
import { ItemTypeDeleteComponent } from './item-type/item-type-delete.component';
import { ItemTypeViewComponent } from './item-type/item-type-view.component';
import { ItemTypeLabelPipe } from './item-type/item-type-label.pipe';
import { ItemTypeAddComponent } from './item-type/item-type-add.component';
import { ItemTypeSelectComponent } from './item-type/item-type-select.component';
import { ItemListComponent } from './item/item-list.component';
import { ItemClassSelectComponent } from './item-type/item-class-select.component';
import { ItemEditComponent } from './item/item-edit.component';
import { ItemDeleteComponent } from './item/item-delete.component';
import { ItemViewComponent } from './item/item-view.component';
import { ItemAddComponent } from './item/item-add.component';
import { ItemSelectComponent } from './item/item-select.component';
import { SettingComponent } from './setting.component';

@NgModule({
  declarations: [
    ProductComponent,
    UnitListComponent,
    UnitEditComponent,
    UnitDeleteComponent,
    UnitAddComponent,
    UnitViewComponent,
    UnitSelectComponent,
    ItemTypeListComponent,
    ItemTypeEditComponent,
    ItemTypeDeleteComponent,
    ItemTypeLabelPipe,
    ItemTypeViewComponent,
    ItemTypeAddComponent,
    ItemTypeSelectComponent,
    ItemListComponent,
    ItemClassSelectComponent,
    ItemEditComponent,
    ItemDeleteComponent,
    ItemViewComponent,
    ItemAddComponent,
    ItemSelectComponent,
    SettingComponent,
  ],
  exports: [
  ],
    imports: [
        {
            ngModule: SharedModule
        },
        CommonModule,
        GeneralModule,
    ]
})
export class ProductModule {
}




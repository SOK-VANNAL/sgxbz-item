import { ProductComponent} from './product.component';
import { UnitListComponent } from './unit/unit-list.component';
import { ItemTypeListComponent } from './item-type/item-type-list.component';
import { ItemListComponent } from './item/item-list.component';
import { SettingComponent} from "./setting.component";
import {MENU_ITEMS, PermissionKeys, ROUTES, TENANT_SETTINGS} from "@sgxbz/shared";

export function register_module() {
  ROUTES.find(x => x.path === "")
    .children.splice(0, 0, ...[
    {
      path: 'product',
      component: ProductComponent,
      children: [
        {path: 'unit', component: UnitListComponent},
        {path: 'item-type', component: ItemTypeListComponent},
        {path: 'item', component: ItemListComponent}
      ]
    }
  ]);

  ROUTES.find(x => x.path === "")?.children
    .find(x => x.path == "system-setting")?.children.push({
    path: 'item',
    component: SettingComponent
  });

  TENANT_SETTINGS.push({
    label: 'item',
    icon: 'shopping-cart',
    routerLink: '/system-setting/item',
    permissionKey: null
  });

  MENU_ITEMS.push(
    {
      label: 'item',
      routerLink: '/product',
      expanded: false,
      icon: 'shopping-cart',
      index:2,
      permissionKey: PermissionKeys.SALE_SECTION,
      children: [
        {label: 'item', routerLink: '/product/item', permissionKey: PermissionKeys.SALE_SECTION},
        {label: 'item_type', routerLink: '/product/item-type', permissionKey: PermissionKeys.SALE_SECTION},
        {label: 'unit', routerLink: '/product/unit', permissionKey: PermissionKeys.SALE_SECTION}
      ]
    }
  );
}


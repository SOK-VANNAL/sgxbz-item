import { Routes, Route } from '@angular/router';
import {
  ROUTES,
  LANGUAGES,
  REPORT_ITEMS,
  MENU_ITEMS,
  GENERAL_SETTINGS,
  PermissionKeys,
  TENANT_SETTINGS
} from '@sgxbz/shared';
import { DASHBOARD_ROUTE } from '../dashboard/dashboard.routes';

// override products module.
// import '../product/product.routes';

// // override language.
// LANGUAGES.push({key:'th_TH', image:'../../assets/image/kh_FLAG.png'})

ROUTES.find(r=>r.path==="")
      .children.splice(0, 0 , ...DASHBOARD_ROUTE);

// that will move to shared package
GENERAL_SETTINGS.pop();
GENERAL_SETTINGS.push({
  index: 1,
  label: 'general_setting',
  children:[
    {label: 'outlet', routerLink: '/setting/outlet' , permissionKey: PermissionKeys.SALE_SECTION },
    {label: 'template', routerLink: '/setting/template', permissionKey: PermissionKeys.SALE_SECTION },
    {label: 'currency', routerLink: '/setting/currency', permissionKey: PermissionKeys.SALE_SECTION },
    {label: 'auto_number', routerLink: '/setting/autonumber', permissionKey: PermissionKeys.SALE_SECTION },
  ]
});

// override menu
MENU_ITEMS.push(
  {
    label: 'dashboard',
    routerLink: '/dashboard',
    expanded: false,
    icon: 'wallet',
    permissionKey: PermissionKeys.SALE_SECTION,
    children: [
    ]
  }
);

// // override report
// REPORT_ITEMS.push({
//   index: 5,
//   label: 'report_4',
//   permissionKey: PermissionKeys.ACCOUNTING_REPORT,
//   children: [
//     {index: 0, label: 'report_profit_loss', routerLink: '/report/profit-loss',
//       permissionKey: PermissionKeys.ACCOUNTING_REPORT__PROFIT_LOSS},
//     {index: 1, label: 'report_balance_sheet', routerLink: '/report/balance-sheet',
//       permissionKey: PermissionKeys.ACCOUNTING_REPORT__BALANCE_SHEET},
//     {index: 1, label: 'report_trial_balance', routerLink: '/report/trial-balance',
//       permissionKey: PermissionKeys.ACCOUNTING_REPORT__TRIAL_BALANCE},
//     {index: 1, label: 'report_general_ledger', routerLink: '/report/general-ledger',
//       permissionKey: PermissionKeys.ACCOUNTING_REPORT__GENERAL_LEDGER},
//     {index: 1, label: 'report_general_journal', routerLink: '/report/general-journal',
//       permissionKey: PermissionKeys.ACCOUNTING_REPORT__GENERAL_JOURNAL},
//   ]
// })


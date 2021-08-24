import {Observable, Observer} from 'rxjs';
import {FormControl, Validators, AbstractControl, ValidatorFn} from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

export type MyErrorsOptions = { km_KH: string; en: string } & Record<string, NzSafeAny>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;
export class MyValidators extends Validators {
  static autoTips: Record<string, Record<string, string>> = {
    km_KH: {
      required: 'ទាមទារការបញ្ចូល!'
    },
    en: {
      required: 'Input is required!'
    },
    default: {
    }
  };
  static maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return {maxlength: { km_KH: `មិនត្រូវសរសេរលើសពីពាក្យកំណត់!`, en: `Must not exceed the word limit!`}};
    };
  }
  static codeMaxLengthValidator(maxLength: number = 50): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return {
        maxlength: {
          km_KH: `មិនត្រូវបញ្ចូលលើសពី ${maxLength}តួអក្សរទេ!`,
          en: `Must not exceed ${maxLength} characters!`
        }
      };
    };
  }
  static nameMaxLengthValidator(maxLength: number = 500): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return {
        maxlength: {
          km_KH: `មិនត្រូវសរសេរលើសពី ${maxLength}អក្សរ!`,
          en: `Must not exceed ${maxLength} characters!`
        }
      };
    };
  }
  static noteMaxLengthValidator(maxLength: number = 2000): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return {
        maxlength: {
          km_KH: `មិនត្រូវសរសេរលើសពី ${maxLength}អក្សរ!`,
          en: `Must not exceed ${maxLength} characters!`
        }
      };
    };
  }
  static nameExistValidator(service: any, id: number = 0, message: string = null): any {
    return  (control: FormControl) =>
      new Observable((observer: Observer<Validators | null>) => {
        if (id) {
          if (!(control.value && control.dirty)){observer.next(null); observer.complete(); return; }
        }
        setTimeout(() => {
          if (control.value && control.status) {
            service.exists(control.value, id).subscribe((result: boolean) => {
              if (result) {
                observer.next({
                  duplicated: {
                    km_KH: message ?? 'ឈ្មោះមានរួចហើយ!',
                    en: message ?? 'Name already exists!'
                  }
                });
              } else {
                observer.next(null);
              }
              observer.complete();
            });
          }
        }, 600);
      });
  }
  static codeExistValidator(service: any, id: number = 0, message: string = null): any {
    return  (control: FormControl) =>
      new Observable((observer: Observer<Validators | null>) => {
        if (id) {
          if (!(control.value && control.dirty)){observer.next(null); observer.complete(); return; }
        }
        setTimeout(() => {
          if (control.value && control.status) {
            const params = [{
              key: 'code',
              val: control.value
            }];
            service.exists('', id, params).subscribe((result: boolean) => {
              if (result) {
                observer.next({
                  duplicated: {
                    km_KH: message ?? 'កូដមានរួចហើយ!',
                    en: message ?? 'Code already exists!'
                  }
                });
              } else {
                observer.next(null);
              }
              observer.complete();
            });
          }
        }, 600);
      });
  }
  static barcodeExistValidator(service: any, id: number = 0, message: string = null): any {
    return  (control: FormControl) =>
      new Observable((observer: Observer<Validators | null>) => {
        if (id) {
          if (!(control.value && control.dirty)){observer.next(null); observer.complete(); return; }
        }
        setTimeout(() => {
          if (control.value && control.status) {
            const params = [{
              key: 'barcode',
              val: control.value
            }];
            service.exists('', id, params).subscribe((result: boolean) => {
              if (result) {
                observer.next({
                  duplicated: {
                    km_KH: message ?? 'បាកូដមានរួចហើយ!',
                    en: message ?? 'Barcode already exists!'
                  }
                });
              } else {
                observer.next(null);
              }
              observer.complete();
            });
          }
        }, 600);
      });
  }
}

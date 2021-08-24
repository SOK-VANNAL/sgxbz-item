import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'itemTypeLabelPipe'})

export class ItemTypeLabelPipe implements PipeTransform{
  transform(value: any): string {
    if (value === 1) {
      return 'Service';
    }
    else if (value === 2){
      return 'NoStock';
    }
    else if (value === 3){
      return 'Stock';
    }
    else {
      return null;
    }
  }
}

import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'textLimit'})

export class TextLimitPipe implements PipeTransform{
  transform(value: any, limit: number = 50): string {
    return value?.length > limit ? value.slice(0, limit) + '...' : value;
  }
}

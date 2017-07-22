import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipesfilter'
})
export class PipesfilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}

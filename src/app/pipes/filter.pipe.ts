import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any, search: any): any {

    //check if search term is undefined
    if(search === undefined) return items;

    //return updates people array
    return items.filter(function(thisitem){
        return thisitem.itemName.toLowerCase().includes(search.toLowerCase());
    }) 

  }

  // transform(value: any, args?: any): any {
  //   return null;
  // }

}

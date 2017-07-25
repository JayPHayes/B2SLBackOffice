import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchItem'
})
export class SearchPipe implements PipeTransform {

   transform(items: any, search: any): any {

    console.log('XXX items: ', items)

    //check if search term is undefined
    if(search === undefined) return items;

    //return updates people array
    return items.filter(function(thisitem){
      console.log('XXX thisitem: ', thisitem)
      return thisitem.name.toLowerCase().includes(search.toLowerCase());
    }) 

  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectedDocFilter',
  pure: false
})
export class SelectedDocFilterPipe implements PipeTransform {

  transform(selectedDocuments: any[], isTest: number): any {
    if (isTest === -1) {
      return selectedDocuments.filter((item) => item.hasOwnProperty('test')===true);
    }
    else {
      return selectedDocuments.filter((item) => item.hasOwnProperty('status')===true&&item['id']===isTest);
    }
  }

}

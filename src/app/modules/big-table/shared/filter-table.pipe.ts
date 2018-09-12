import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTable',
  pure: false
})
export class FilterTablePipe implements PipeTransform {

  transform(columns: string[], columnVisibility: boolean[]): any {
    return columns.filter((item, index) => columnVisibility[index] === true);
  }

}

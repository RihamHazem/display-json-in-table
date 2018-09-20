import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'smFilterTable',
  pure: false
})
export class SmFilterTablePipe implements PipeTransform {

  transform(rows: any, rowVisibility): any {
    return rows.filter((item) => {
      // show the row if it's Status and fStatus BOTH marked as visible
      return rowVisibility["Status"][item["Status"]] === true && rowVisibility["fStatus"][item["fStatus"]] === true;
    });
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterRow',
  pure: false
})
export class FilterRowPipe implements PipeTransform {

  transform(tableData: any[], visibility): any {
    return tableData.filter(item => {
      let res = true;
      for (let col in visibility) { // status, mgc_home_gpath, requested_vcos
        for (let row in visibility[col]) {
          if (row == item[col]) {
            res = res && visibility[col][row];
          }
        }
      }
      return res;
    })
  }

}

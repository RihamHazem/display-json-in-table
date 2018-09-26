import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'smFilterTable',
  pure: false
})
export class SmFilterTablePipe implements PipeTransform {

  transform(rows: any, rowVisibility): any {
    let newArr = [];
    for (let key in rows) {
      let allTrue = false;
      for (let index in rows[key]) {
        let subTrue = false;
        for (let fs in rows[key][index]["fStatus"]) {
          subTrue = subTrue || (rowVisibility["fStatus"][rows[key][index]["fStatus"][fs]] === true);
        }
        allTrue = allTrue || (rowVisibility["Status"][rows[key][index]["Status"]] === true && subTrue);
      }
      if (allTrue) {
        newArr.push({
          "Tests": key,
          "Data": rows[key]
        });
      }
    }
    return newArr;
  }

}

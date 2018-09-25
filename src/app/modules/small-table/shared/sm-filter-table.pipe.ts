import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'smFilterTable',
  pure: false
})
export class SmFilterTablePipe implements PipeTransform {

  transform(rows: any, rowVisibility): any {
    let newArr = [];
    for (let key in rows) {
      let allTrue = true;
      for (let index in rows[key]) {
        allTrue = allTrue && rowVisibility["Status"][rows[key][index]["Status"]] && rowVisibility["fStatus"][rows[key][index]["fStatus"]] === true;
      }
      if (allTrue) {
        newArr.push({
          "Tests": key,
          "Data": rows[key]
        });
      }
    }
    console.log(newArr);
    return newArr;
    // return rows.filter((item) => {
    //   // show the row if it's Status and fStatus BOTH marked as visible
    //   let allTrue = true;
    //   for (let index in item["fStatus"]) {
    //     allTrue = allTrue && rowVisibility["Status"][item["Status"][index]] && rowVisibility["fStatus"][item["fStatus"][index]] === true;
    //   }
    //   return allTrue;
    // });
  }

}

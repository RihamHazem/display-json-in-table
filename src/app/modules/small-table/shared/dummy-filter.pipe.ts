import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dummyFilter'
})
export class DummyFilterPipe implements PipeTransform {

  transform(value, args: any): any {
    let newArr = [];
    for (let key in value) {
      let allTrue = false;
      for (let index in value[key]) {
        let subTrue = false;
        for (let fs in value[key][index]["fStatus"]) {
          subTrue = subTrue || (args["fStatus"][value[key][index]["fStatus"][fs]] === true);
        }
        allTrue = allTrue || (args["Status"][value[key][index]["Status"]] === true && subTrue);
      }
      if (allTrue)
        newArr.push({"Tests": key, "Data": value[key]});
    }
    return newArr;
  }

}

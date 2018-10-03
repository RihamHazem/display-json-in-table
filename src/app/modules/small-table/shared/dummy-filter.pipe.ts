import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dummyFilter'
})
export class DummyFilterPipe implements PipeTransform {

  transform(value, args: any): any {
    // order = true means increasing, false means decreasing
    let rowVisibility = args['vis'];
    let order = args['order']['order'];
    let indxCol = args['order']['index'];
    let newArr = [];
    for (let key in value) {
      let allTrue = false;
      for (let index in value[key]) {
        let subTrue = false;
        for (let fs in value[key][index]["fStatus"]) {
          subTrue = subTrue || (rowVisibility["fStatus"][value[key][index]["fStatus"][fs]] === true);
        }
        allTrue = allTrue || (rowVisibility["Status"][value[key][index]["Status"]] === true && subTrue);
      }
      if (allTrue)
        newArr.push({"Tests": key, "Data": value[key]});
    }
    if (indxCol === 0) {
      newArr = this.testSort(order, newArr);
    } else if (indxCol >= 1) {
      newArr = this.statusSort(order, newArr, indxCol - 1);
    }
    return newArr;
  }

  testSort(order: boolean, newArr: any[]) {
    newArr.sort();
    if (!order) {
      newArr.reverse();
    }
    return newArr;
  }
  statusSort(order: boolean, newArr: any[], statusIndex: number) {
    newArr.sort(function (a: string, b: string) {
      return a['Data'][statusIndex]['Status'] < b['Data'][statusIndex]['Status']? -1 : 1;
    });
    if (!order) {
      newArr.reverse();
    }
    return newArr;
  }

}

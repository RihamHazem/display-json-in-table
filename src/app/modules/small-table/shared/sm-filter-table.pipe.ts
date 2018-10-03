import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'smFilterTable'
})
export class SmFilterTablePipe implements PipeTransform {

  transform(testNames: string[], val: string): any {
    if (val === "") return [];
    return testNames.filter(item => item.indexOf(val) !== -1).slice(0, 10);
  }

}

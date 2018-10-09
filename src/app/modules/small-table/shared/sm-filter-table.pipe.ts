import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'smFilterTable'
})
export class SmFilterTablePipe implements PipeTransform {

  transform(data: string[]): any {
    console.log(data, data.filter(item => item['Status'] != "NO STATUS"));
    return data.filter(item => item['Status'] != "NO STATUS");
  }

}

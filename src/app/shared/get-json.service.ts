import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetJsonService {
  // the path of the big table JSON
  private jsonBigTableUrl = '../assets/test_summary.json';
  // the path of the small table JSON
  private jsonSmallTableUrl = '../assets/test_details_mul.json';
  constructor(private http: HttpClient) { }
  // it's an http request to get the BigTable JSON
  getJsonBigTable () {
    return this.http.get<any[]>(this.jsonBigTableUrl);
  }
  // it's an http request to get the SmallTable JSON
  getJsonSmallTable () {
    return this.http.get<any[]>(this.jsonSmallTableUrl);
  }
}

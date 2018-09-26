import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetJsonService {
  // the path of the big table JSON
  private jsonBigTableUrl = 'http://regweb/regression_web/mars.php?pattern=find_run_submissions+-q+%22submit_time%3E%3D%272018-09-21%27+and+submitter%3D%27oragi%27%22';
  // the path of the small table JSON
  private jsonSmallTableUrl = 'http://regweb/regression_web/mars.php?&mars_id%5b%5d=93b5e230-bf36-11e8-bd04-751329575ff9&mars_id%5b%5d=4ca013d0-befe-11e8-989b-54c16d2a9ef4&&action=explore';
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

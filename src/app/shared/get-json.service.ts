import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetJsonService {
  // the path of the big table JSON
  private marsUrl = 'http://regweb/regression_web/mars.php';

  constructor(private http: HttpClient) { }
  // it's an http request to get the BigTable JSON
  getJsonTable (params: string) {
    return this.http.get<any[]>(this.marsUrl + '?' + encodeURI(params));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetJsonService {
  // the path of the big table JSON
  private marsUrl = 'http://regweb/regression_web/mars.php';
  private apiUrl = 'http://orw-oragi-r6:3000/';

  constructor(private http: HttpClient) { }
  // it's an http request to get the BigTable JSON
  getJsonTable (params: string) {
    return this.http.get<any[]>(this.marsUrl + '?' + encodeURI(params));
  }

  createNote(params) {
    return this.http.post(this.apiUrl + 'note/create', params);
  }
}

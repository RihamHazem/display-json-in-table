import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetJsonService {
  // the path of the big table JSON
  private marsUrl = 'http://regweb/regression_web/mars.php';
  private apiUrl = 'http://orw-oragi-r6:8000/';
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private http: HttpClient) { }
  // it's an http request to get the BigTable JSON
  getJsonTable (params: string) {
    return this.http.get<any[]>(this.marsUrl + '?' + encodeURI(params));
  }

  createNote(params) {
    return this.http.post<any>(this.apiUrl + 'note/create', params, this.options);
  }
  updateNote(params) {
    return this.http.post<any>(this.apiUrl + 'note/update', params, this.options);
  }
  attachNotes(params) {
    return this.http.post<any>(this.apiUrl + 'note/attach', params, this.options);
  }
  detachNotes(params) {
    return this.http.post<any>(this.apiUrl + 'note/detach', params, this.options);
  }
}

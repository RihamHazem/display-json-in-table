import { Injectable } from '@angular/core';
import { Observable } from "rxjs/internal/Observable";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GetJsonService {
  private jsonUrl: string = "./data-json.json";
  constructor(private http: HttpClient) { }

  getJson(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl);
  }
}

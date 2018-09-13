import { Injectable } from '@angular/core';
import { Observable } from "rxjs/internal/Observable";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GetJsonService {
  private jsonUrl: string = "../assets/test_summary.json";
  constructor(private http: HttpClient) { }

  getJson() {
    // console.log("making the request");
    return this.http.get<any[]>(this.jsonUrl);
  }
}

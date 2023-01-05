import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpmethodsService {


  urlbase: string = `http://localhost:3001`


  constructor(private http: HttpClient) { }



  // sendObj(obj: any): Observable<any> {
  //   return this.http.post<any>(
  //     `${this.urlbase}/generator`, obj
  //   );
  // }


  sendObj(obj: any): Observable<any> {
    return this.http.post<any>(`${this.urlbase}/generator`, obj )
  }
  
}

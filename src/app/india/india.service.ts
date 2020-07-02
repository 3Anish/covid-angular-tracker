import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map,tap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class IndiaService {

  constructor(private http:HttpClient) { }

  // getPosition(): Promise<any>
  // {
  //   return new Promise((resolve, reject) => {

  //     navigator.geolocation.getCurrentPosition(resp => {

  //         resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
  //       },
  //       err => {
  //         reject(err);
  //       });
  //   });


getStateWiseDate():Promise<any>{
  return this.http.get("https://www.mohfw.gov.in/data/data.json")
    .toPromise()
    .catch(err=>console.log(err))
}
getTotalAndNewCases():Promise<any>{
  return this.http.get("https://www.mohfw.gov.in/data/datanew.json")
    .toPromise()
    .catch(err=>console.log(err))
}


}

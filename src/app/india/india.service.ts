import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map,tap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class IndiaService {

  constructor(private http:HttpClient) { }

  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });

  }
getTotalConfirmedCases(): Promise<any> {
  return this.http.get("/otherDetails")
      
      .toPromise()
      .catch(err=>console.log(err));
}
getOtherLinks():Promise<any>{
  return this.http.get("/links")
  .toPromise()
  .catch(err=>console.log(err))
}
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
// gettotalConfirmedCasesIndians(): Promise<any> {
//     return this.http.get("/totalConfirmedCasesIndians")
        
//         .toPromise()
//         .catch(err=>console.log(err));
// }
// gettotalConfirmedCasesForeigns(): Promise<any> {
//     return this.http.get("/totalConfirmedCasesForeigns")
        
//         .toPromise()
//         .catch(err=>console.log(err));
// }
// getCureds(): Promise<any> {
//     return this.http.get("/cureds")
        
//         .toPromise()
//         .catch(err=>console.log(err));
// }

// getDeaths(): Promise<any> {
//     return this.http.get("/deaths")
        
//         .toPromise()
//         .catch(err=>console.log(err));
// }

  // getStateNames():Observable<any>{
  //   return this.http.get<any>("/stateNames")
  //   .pipe(
  //     tap(data=>console.log(data))
  //   );
  // }
}

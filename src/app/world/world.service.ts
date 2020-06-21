import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map,tap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WorldService {

  constructor(private http:HttpClient) { }

  getOtherLinks():Promise<any>{
    return this.http.get("/links")
    .toPromise()
    .catch(err=>console.log(err))
  }
  getLatestUpdated():Promise<any>{
    return this.http.get("/latestUpdateSection")
    .toPromise()
    .catch(err=>console.log(err))
  }
  getAwarenessData():Promise<any>{
    return this.http.get("/awarenessData")
    .toPromise()
    .catch(err=>console.log(err))
  }

// getChartData(): Promise<any> {
//     return this.http.get("/chartData")
        
//         .toPromise()
//         .catch(err=>console.log(err));
// }
// getTableData(): Promise<any> {
//   return this.http.get("/tableData")
      
//       .toPromise()
//       .catch(err=>console.log(err));
// }
// getTotalConfirmedCases(): Promise<any> {
//   return this.http.get("/otherDetails")
      
//       .toPromise()
//       .catch(err=>console.log(err));
// }


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

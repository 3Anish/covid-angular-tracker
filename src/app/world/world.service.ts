import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map,tap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WorldService {

  constructor(private http:HttpClient) { }

 


}

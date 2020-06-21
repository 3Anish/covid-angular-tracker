import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http:HttpClient) { }
  API_KEY = 'd8a3ac1edfa847e4af19a704aa7bfc8f';
  public getNews(){
    return this.http.get(`https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=${this.API_KEY}`);
  }
}

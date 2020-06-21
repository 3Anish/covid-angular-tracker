import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  articles: any;

  constructor(private newsService:NewsService) { }

  ngOnInit(): void {
    this.newsService.getNews().subscribe({
      next:data=>{
        console.log(data);
        this.articles=data['articles'];
      },
      error:err=>console.log(err)
    });
  }

}

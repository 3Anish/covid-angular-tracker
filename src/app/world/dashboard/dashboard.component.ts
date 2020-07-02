import { Component, OnInit } from '@angular/core';
import { WorldService } from '../world.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(private worldService:WorldService) { }

  ngOnInit(): void {
    
  // getAwarenessData
   

  }
 
  

}

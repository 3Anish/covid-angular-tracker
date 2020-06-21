import { Component, OnInit } from '@angular/core';
import { WorldService } from '../world.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  districtWiseCases: any;
  helplineLink: any;
  faqLink: any;
  socialAdvisoryLink: any;
  statusMessage: string;
  allDates: any=[];
  allLinksText: any=[];
  allLinks: any=[];
  cols: any=[];
  allLatestUpdates: any;
  allTitles: any=[];
  allTitlesLinks: any=[];

  constructor(private worldService:WorldService) { }

  ngOnInit(): void {
    this.worldService.getAwarenessData()
    .then((data)=>{
       this.allTitles=data.allTitles;
       this.allTitlesLinks=data.allTitlesLinks;
    
    }, (error) => {
          this.statusMessage =
                'Problem with the service. Please try again after sometime';
          console.error(error);
       });
  
  // getAwarenessData
   
    this.worldService.getOtherLinks()
    .then((data)=>{
      //  this.districtWiseCases=data.districtWiseCases;
       this.helplineLink=data.helplineLink;
       this.faqLink=data.faqLink;
      //  this.socialAdvisoryLink=data.socialAdvisoryLink;
    }, (error) => {
          this.statusMessage =
                'Problem with the service. Please try again after sometime';
          console.error(error);
       });
       
       this.worldService.getLatestUpdated()
       .then((data)=>{
       
          this.allDates=data.allDates;
          this.allLinksText=data.allLinksText;
          this.allLinks=data.allLinks;
   
       }, (error) => {
             this.statusMessage =
                   'Problem with the service. Please try again after sometime';
             console.error(error);
          });
     }
  }
 
  



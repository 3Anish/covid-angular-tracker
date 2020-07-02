import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
// import * as Highcharts1 from 'highcharts';
import { IndiaService } from '../india.service';
// import MapModule from 'highcharts/modules/map';

// import * as 'highcharts/map-collection/countries/ug/ug-all.geo.json';
// declare var require: any;
// https://code.highcharts.com/mapdata/countries/in/custom/in-all-disputed.geo.json
// const India = require('@highcharts/map-collection/countries/in/custom/in-all-disputed.geo.json');
// console.log(India);
// MapModule(Highcharts1);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

 
   tableData: any;
   cols: { field: string; header: string; }[];
   totalCases: any=[];
   totalCuredCases: any;
   totalDeathCases: any;
   selectedIndex: any=0;
   show_tab: any=0;
   highcharts:any;
   districtWiseCases: any;
   faqLink: any;
   helplineLink: any;
   socialAdvisoryLink: any;
   lastUpdated: any;
   totalPassengersScreendAirport: any;
   allCasesTillNow: any;
   states:any=[];
   totalConfirmedCasesIndians=[];
   totalConfirmedCasesForeigns=[];
   curedCases=[];
   deathCases=[];
   totalConfirmedCases: any;
   todayPositiveCases: number;
   todayCuredCases: number;
   todayDeathCases: number;
   _listFilter = '';
   filteredList: any=[];
   get listFilter(): string {
      return this._listFilter;
    }
    set listFilter(value: string) {
      this._listFilter = value;
      console.log(this._listFilter);
      this.filteredList = this.listFilter ? this.performFilter(this.listFilter) : this.tableData;
     
    }
    performFilter(filterBy: string): any {
      console.log(filterBy);
      filterBy = filterBy.toLocaleLowerCase();
      return this.tableData.filter((state: any) =>
      state.state_name.toLocaleLowerCase().indexOf(filterBy) !== -1);
   }
 
  
  constructor(private indiaService:IndiaService) {
   
   }
  
    chartData:any;

  statusMessage:string;
  ngOnInit(): void {
   // this.indiaService.getPosition().then(pos=>
   //    {
   //       console.log(`Positon: ${pos.lng} ${pos.lat}`);
   //    });
 
     this.cols=[
      { field: 'Name of State/UT', header: 'Name of State/UT' },
      { field: 'Total Confirmed cases(Indian/Foreign National)', header: 'Total Confirmed cases(Indian National)' },
      // { field: 'Total Confirmed cases( Foreign National )', header: 'Total Confirmed cases( Foreign National )' },
      { field: 'Cured/Discharged', header: 'Discharged' },
      { field: 'Deaths', header:'Deaths'}
   ];
   this.indiaService.getStateWiseDate()
   .then((data)=>{
      data.map(x=>{
         this.curedCases.push(x.cured);
         this.deathCases.push(x.death);
         this.totalCases.push(x.positive);
         this.states.push(x.state_name.toUpperCase())
      });
    
      this.tableData=data;
      this.filteredList=data;
     
      
      this.curedCases=this.curedCases.map(Number);
      this.totalCases=this.totalCases.map(Number);
      this.deathCases=this.deathCases.map(Number);
     
      this.states.find(s=>s.state_name)
      this.options.xAxis.categories=this.states;

      this.options.series[0]['data'] = this.totalCases;
      this.options.series[1]['data'] = this.curedCases;
      this.options.series[2]['data'] = this.deathCases;
         Highcharts.chart('graph-container', this.options);
          this.highcharts = Highcharts;
         

   },
    (error) => {
      this.statusMessage =
            'Problem with the service. Please try again after sometime';
      console.error(error);
   })
   this.indiaService.getTotalAndNewCases()
   .then((data)=>{
     // this.tableData=data;
     this.allCasesTillNow=data[37].new_positive;
     this.totalConfirmedCases=data[37].new_active;
     this.totalCuredCases=data[37].new_cured;
     this.totalDeathCases=data[37].new_death;
     this.todayPositiveCases=this.allCasesTillNow-data[37].positive;
     this.todayCuredCases=this.totalCuredCases-data[37].cured;
     this.todayDeathCases=this.totalDeathCases-data[37].death;

   },
    (error) => {
      this.statusMessage =
            'Problem with the service. Please try again after sometime';
      console.error(error);
   })

  
 
      

  } 
  

  public options: any =  {  
    
      chart: {
         type: 'column',
       
      },
      title: {
         text: 'Indian Covid-19 Cases',
      },
      subtitle:{
         text: 'State-wise Data' 
      },
      xAxis:{
       
         categories:[],
         lineWidth:0,
         lineColor: 'transparent',

         crosshair: true  ,
            
      },     
      yAxis : {
         min: 0,
         tickInterval:100,
         title: {
            text: 'Counts'   ,
        
      
         } 
            
      },
      tooltip : {
         headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
         pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
            '<td style = "padding:0"><b>{point.y:.1f} </b></td></tr>', 
            footerFormat: '</table>', 
            shared: true,
             useHTML: true
      },
      plotOptions : {
         column: {
            pointPadding: 0.2,
            borderWidth: 0
         }
         
      },
     
     credits: {
         enabled: false
     },
      series: [{
         name: 'Confirmed',
         data: []
      }, 
    
      {
         name: 'Cured',
         data: []
      }, 
      {
         name: 'Deaths',
         data: []
      }]
   };
  
}



  
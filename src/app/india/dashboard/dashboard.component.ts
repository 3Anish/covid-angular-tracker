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
   //map highchart code
   // state_names:any=[
   //    ["Andhra Pradesh"],
   //    ["Andaman and Nicobar Islands"],
   //    ["Arunachal Pradesh"],
   //    ["Assam"],
   //    ['bihar', 4],
   //    ['lakshadweep', 5],
   //    ['andaman and nicobar', 6],
   //    ['assam', 7],
   //    ['west bengal', 8],
   //    ['puducherry', 9],
   //    ['daman and diu', 10],
   //    ['gujarat', 11],
   //    ['rajasthan', 12],
   //    ['dadra and nagar haveli', 13],
   //    ['chhattisgarh', 14],
   //    ['tamil nadu', 15],
   //    ['chandigarh', 16],
   //    ['punjab', 17],
   //    ['haryana', 18],
   //    ['andhra pradesh', 19],
   //    ['maharashtra', 20],
   //    ['himachal pradesh', 21],
   //    ['meghalaya', 22],
   //    ['kerala', 23],
   //    ['telangana', 24],
   //    ['mizoram', 25],
   //    ['tripura', 26],
   //    ['manipur', 27],
   //    ['arunanchal pradesh', 28],
   //    ['jharkhand', 29],
   //    ['goa', 30],
   //    ['delhi', 31],
   //    ['odisha', 32],
   //    ['jammu and kashmir', 33],
   //    ['sikkim', 34],
   //    ['uttarakhand', 35]
  
   // ].map(x=>x[0].toString().toUpperCase());
    
  
   // chart;
   // data.map(x=>console.log(x));
   
   // updateFromInput = false;
   // highcharts1:any;
   // chartConstructor = "mapChart";
   // chartCallback;
  
   //map highchart code
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
         
         //  for(var i=0;i<this.tableData.length;i++){
         //        this.chartOptions.series[i]['name']=this.states;
         //        this.chartOptions.series[i]['data']=this.totalCases;
         //  }
         //  data.find(x=>console.log(typeof x.state_name.toUpperCase()));
         // let result=[];
         // Highcharts1.chart('container',this.chartOptions)
         // this.highcharts1 = Highcharts1;
         //   console.log(data.find(x=>x.state_name.toUpperCase()===this.state_names));
        //  console.log(result);
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
   },
    (error) => {
      this.statusMessage =
            'Problem with the service. Please try again after sometime';
      console.error(error);
   })

   this.indiaService.getTotalConfirmedCases()
   .then((data)=>{
      this.totalConfirmedCases=data.totalCasesInIndia;
      this.totalCuredCases=data.totalCured;
      this.totalDeathCases=data.totalDeaths;
      this.lastUpdated=data.lastUpdated;
      this.totalPassengersScreendAirport=data.totalPassengersScreendAirport;
   }, (error) => {
         this.statusMessage =
               'Problem with the service. Please try again after sometime';
         console.error(error);
      });
    this.indiaService.getOtherLinks()
   .then((data)=>{
      this.districtWiseCases=data.districtWiseCases;
      this.helplineLink=data.helplineLink;
      this.faqLink=data.faqLink;
      this.socialAdvisoryLink=data.socialAdvisoryLink;
   }, (error) => {
         this.statusMessage =
               'Problem with the service. Please try again after sometime';
         console.error(error);
      });
   
 
      

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



  
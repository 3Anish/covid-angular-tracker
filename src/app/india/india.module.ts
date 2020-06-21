import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndiaRoutingModule } from './india-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from 'app/material/material.module';
import { HighchartsChartModule } from 'highcharts-angular';






@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    HighchartsChartModule,
   IndiaRoutingModule
  ]
})
export class IndiaModule { }

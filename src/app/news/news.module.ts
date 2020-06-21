import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from 'app/material/material.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NewsRoutingModule
  ]
})
export class NewsModule { }

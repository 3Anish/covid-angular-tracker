import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorldRoutingModule } from './world-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from 'app/material/material.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    WorldRoutingModule
  ]
})
export class WorldModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {AccordionModule} from 'primeng/accordion';



const modules=[
  TableModule,
  CardModule,
  ButtonModule,
  AccordionModule

]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    modules
   
  ],
  exports:[modules]
})
export class MaterialModule { }

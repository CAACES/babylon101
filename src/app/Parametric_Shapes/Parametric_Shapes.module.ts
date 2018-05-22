import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatCardModule, MatMenuModule, MatGridListModule } from '@angular/material';

import { ParametricShapesComponent } from './Parametric_Shapes.component';
import { LinesService } from './lines.service';
import { SpiralService } from './spiral.service';
import { DashedService } from './dashed.service';
import { InstanceService } from './instance.service';



@NgModule({
  declarations: [
    ParametricShapesComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatGridListModule
  ],
  providers: [LinesService, SpiralService, DashedService, InstanceService]
})
export class ParametricShapesModule { }




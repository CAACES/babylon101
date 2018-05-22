import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatCardModule, MatMenuModule, MatGridListModule } from '@angular/material';

import { PositionandRotationComponent } from './Position_and_Rotation.component';
import { PositionService } from './position.service';
import { RotationService } from './rotation.service';





@NgModule({
  declarations: [
    PositionandRotationComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatGridListModule
  ],
  providers: [PositionService, RotationService]
})
export class PositionandRotationModule { }




import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatCardModule, MatMenuModule, MatGridListModule } from '@angular/material';

import { CamerasComponent } from './cameras.component';
import { UniversalService } from './universal.service';


@NgModule({
  declarations: [
    CamerasComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatGridListModule
  ],
  providers: [
    UniversalService,
  ]
})
export class CamerasModule { }

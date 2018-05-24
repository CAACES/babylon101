import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatCardModule, MatMenuModule, MatGridListModule } from '@angular/material';

import { DiscoverBasicElementsComponent } from './discover_basic_elements.component';
import { BoxService } from './box.service';
import { SphereService } from './sphere.service';
import { PlaneService } from './plane.service';
import { GroundService } from './ground.service';


@NgModule({
  declarations: [
    DiscoverBasicElementsComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatGridListModule
  ],
  providers: [BoxService, SphereService,
    PlaneService,
    GroundService
  ]
})
export class DiscoverBasicElementsModule { }

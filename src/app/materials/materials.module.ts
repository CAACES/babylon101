import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatCardModule, MatMenuModule, MatGridListModule } from '@angular/material';

import { MaterialsComponent } from './materials.component';
import { DiffuseService } from './diffuse.service';
import { AmbientService } from './ambient.service';
import { TransparentService } from './transparent.service';
import { TextureService } from './texture.service';
import { TransparentTextureService } from './transparentTexture.service';
import { BackgroundService } from './background.service';
import { PointsService } from './points.service';



@NgModule({
  declarations: [
    MaterialsComponent
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
    DiffuseService,
    AmbientService,
    TransparentService,
    TextureService,
    TransparentTextureService,
    BackgroundService,
    PointsService
  ]
})
export class MaterialsModule { }

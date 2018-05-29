import { Component, AfterViewInit, OnDestroy } from '@angular/core';

import * as BABYLON from 'babylonjs';
import 'babylonjs-materials';

import { DiffuseService } from './diffuse.service';
import { AmbientService } from './ambient.service';
import { TransparentService } from './transparent.service';
import { TextureService } from './texture.service';
import { TransparentTextureService } from './transparentTexture.service';
import { BackgroundService } from './background.service';
import { PointsService } from './points.service';



@Component({
  selector: 'app-materials',
  templateUrl: './materials.html',
  styleUrls: ['./materials.css']
})
export class MaterialsComponent implements AfterViewInit, OnDestroy {
  private canEleId12 = 'renderCanvas12';
  private canEleId13 = 'renderCanvas13';
  private canEleId14 = 'renderCanvas14';
  private canEleId15 = 'renderCanvas15';
  private canEleId16 = 'renderCanvas16';
  private canEleId17 = 'renderCanvas17';
  private canEleId18 = 'renderCanvas18';

  constructor(
      private diffuseServ: DiffuseService,
      private ambientServ: AmbientService,
      private transparentServ: TransparentService,
      private textureServ: TextureService,
      private transparentTextureServ: TransparentTextureService,
      private backgroundServ: BackgroundService,
      private PointsServ: PointsService,
    ) { }

  cards = [
    { title: 'Card 1', cols: 2, rows: 1 },
    { title: 'Card 2', cols: 1, rows: 1 },
    { title: 'Card 3', cols: 1, rows: 2 },
    { title: 'Card 4', cols: 1, rows: 1 }
  ];

  ngAfterViewInit() {
    this.diffuseServ.createScene(this.canEleId12);
    this.diffuseServ.animate();
    this.ambientServ.createScene(this.canEleId13);
    this.ambientServ.animate();
    this.transparentServ.createScene(this.canEleId14);
    this.transparentServ.animate();
    this.textureServ.createScene(this.canEleId15);
    this.textureServ.animate();
    this.transparentTextureServ.createScene(this.canEleId16);
    this.transparentTextureServ.animate();
    this.backgroundServ.createScene(this.canEleId17);
    this.backgroundServ.animate();
    this.PointsServ.createScene(this.canEleId18);
    this.PointsServ.animate();

  }

  ngOnDestroy() {
    this.diffuseServ.destroyScene();
  }
}

import { Component, AfterViewInit, OnDestroy } from '@angular/core';

import * as BABYLON from 'babylonjs';
import 'babylonjs-materials';

import { LinesService } from './lines.service';
import { SpiralService } from './spiral.service';
import { DashedService } from './dashed.service';
import { InstanceService } from './instance.service';



@Component({
  selector: 'app-parametric-shapes',
  templateUrl: './Parametric_Shapes.html',
  styleUrls: ['./Parametric_Shapes.css']
})
export class ParametricShapesComponent implements AfterViewInit, OnDestroy {
  private canEleId5 = 'renderCanvas5';
  private canEleId6 = 'renderCanvas6';
  private canEleId7 = 'renderCanvas7';
  private canEleId8 = 'renderCanvas8';






  constructor(
      private linesServ: LinesService,
      private spiralServ: SpiralService,
      private dashedServ: DashedService,
      private instanceServ: InstanceService
    ) { }

  cards = [
    { title: 'Card 1', cols: 2, rows: 1 },
    { title: 'Card 2', cols: 1, rows: 1 },
    { title: 'Card 3', cols: 1, rows: 2 },
    { title: 'Card 4', cols: 1, rows: 1 }
  ];

  ngAfterViewInit() {
    this.linesServ.createScene(this.canEleId5);
    this.linesServ.animate();
    this.spiralServ.createScene(this.canEleId6);
    this.spiralServ.animate();
    this.dashedServ.createScene(this.canEleId7);
    this.dashedServ.animate();
    this.instanceServ.createScene(this.canEleId8);
    this.instanceServ.animate();


  }

  ngOnDestroy() {
    this.linesServ.destroyScene();
  }
}

import { Component, AfterViewInit, OnDestroy } from '@angular/core';

import * as BABYLON from 'babylonjs';
import 'babylonjs-materials';

import { PositionService } from './position.service';
import { RotationService } from './rotation.service';
import { SequencingService } from './sequencing.service';



@Component({
  selector: 'app-position-and-rotation',
  templateUrl: './Position_and_Rotation.html',
  styleUrls: ['./Position_and_Rotation.css']
})
export class PositionandRotationComponent implements AfterViewInit, OnDestroy {
  private canEleId9 = 'renderCanvas9';
  private canEleId10 = 'renderCanvas10';
  private canEleId11 = 'renderCanvas11';
  constructor(
      private positionServ: PositionService,
      private rotationServ: RotationService,
      private sequencingServ: SequencingService,
    ) { }

  cards = [
    { title: 'Card 1', cols: 2, rows: 1 },
    { title: 'Card 2', cols: 1, rows: 1 },
    { title: 'Card 3', cols: 1, rows: 2 },
    { title: 'Card 4', cols: 1, rows: 1 }
  ];

  ngAfterViewInit() {
    this.positionServ.createScene(this.canEleId9);
    this.positionServ.animate();
    this.rotationServ.createScene(this.canEleId10);
    this.rotationServ.animate();
    this.sequencingServ.createScene(this.canEleId11);
    this.sequencingServ.animate();
  }

  ngOnDestroy() {
    this.positionServ.destroyScene();
  }
}

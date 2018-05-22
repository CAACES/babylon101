import { Component, AfterViewInit, OnDestroy } from '@angular/core';

import * as BABYLON from 'babylonjs';
import 'babylonjs-materials';

import { PositionService } from './position.service';
import { RotationService } from './rotation.service';



@Component({
  selector: 'app-Position-and-Rotation',
  templateUrl: './Position_and_Rotation.html',
  styleUrls: ['./Position_and_Rotation.css']
})
export class PositionandRotationComponent implements AfterViewInit, OnDestroy {
  private canEleId9 = 'renderCanvas9';
  private canEleId10 = 'renderCanvas10';
  
  
  
  constructor(private positionServ: PositionService, private rotationServ: RotationService) { }

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
  
  }

  ngOnDestroy() {
    this.positionServ.destroyScene();
  }
}

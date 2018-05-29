import { Component, AfterViewInit, OnDestroy } from '@angular/core';

import * as BABYLON from 'babylonjs';
import 'babylonjs-materials';

import { UniversalService } from './universal.service';


@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.html',
  styleUrls: ['./cameras.css']
})
export class CamerasComponent implements AfterViewInit, OnDestroy {
  private canEleId19 = 'renderCanvas19';

  constructor(
    private UniversalServ: UniversalService,
  ) { }

  cards = [
    { title: 'Card 1', cols: 2, rows: 1 },
    { title: 'Card 2', cols: 1, rows: 1 },
    { title: 'Card 3', cols: 1, rows: 2 },
    { title: 'Card 4', cols: 1, rows: 1 }
  ];

  ngAfterViewInit() {
    this.UniversalServ.createScene(this.canEleId19);
    this.UniversalServ.animate();

  }

  ngOnDestroy() {
    this.UniversalServ.destroyScene();
  }
}

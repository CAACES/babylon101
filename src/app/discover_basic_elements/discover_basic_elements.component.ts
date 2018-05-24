import { Component, AfterViewInit, OnDestroy } from '@angular/core';

import * as BABYLON from 'babylonjs';
import 'babylonjs-materials';

import { BoxService } from './box.service';
import { SphereService } from './sphere.service';
import { PlaneService } from './plane.service';
import { GroundService } from './ground.service';


@Component({
  selector: 'app-discover-basic-elements',
  templateUrl: './discover_basic_elements.html',
  styleUrls: ['./discover_basic_elements.css']
})
export class DiscoverBasicElementsComponent implements AfterViewInit, OnDestroy {
  private canEleId1 = 'renderCanvas1';
  private canEleId2 = 'renderCanvas2';
  private canEleId3 = 'renderCanvas3';
  private canEleId4 = 'renderCanvas4';

  constructor(
    private boxServ: BoxService,
    private sphereServ: SphereService,
    private planeServ: PlaneService,
    private groundServ: GroundService
  ) { }

  cards = [
    { title: 'Card 1', cols: 2, rows: 1 },
    { title: 'Card 2', cols: 1, rows: 1 },
    { title: 'Card 3', cols: 1, rows: 2 },
    { title: 'Card 4', cols: 1, rows: 1 }
  ];

  ngAfterViewInit() {
    this.boxServ.createScene(this.canEleId1);
    this.boxServ.animate();

    this.sphereServ.createScene(this.canEleId2);
    this.sphereServ.animate();

    this.planeServ.createScene(this.canEleId3);
    this.planeServ.animate();

    this.groundServ.createScene(this.canEleId4);
    this.groundServ.animate();
  }

  ngOnDestroy() {
    this.boxServ.destroyScene();
  }
}

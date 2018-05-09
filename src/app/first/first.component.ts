import { FirstService } from './first.service';
import { Component, AfterViewInit, OnDestroy } from '@angular/core';

import * as BABYLON from 'babylonjs';
import 'babylonjs-materials';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: []
})
export class FirstComponent implements AfterViewInit, OnDestroy {
  private canEleId = 'renderCanvas';

  constructor(private firstServ: FirstService) { }

  ngAfterViewInit() {
    this.firstServ.createScene(this.canEleId);
    this.firstServ.animate();
  }

  ngOnDestroy() {
    this.firstServ.destroyScene();
  }
}

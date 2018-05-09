import { EngineService } from './engine.service';
import { Component, AfterViewInit, OnDestroy } from '@angular/core';

import * as BABYLON from 'babylonjs';
import 'babylonjs-materials';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html',
  styleUrls: []
})
export class EngineComponent implements AfterViewInit, OnDestroy {
  private canEleId = 'renderCanvas';

  constructor(private engServ: EngineService) { }

  ngAfterViewInit() {
    this.engServ.createScene(this.canEleId);
    this.engServ.animate();
  }

  ngOnDestroy() {
    this.engServ.destroyScene();
  }
}

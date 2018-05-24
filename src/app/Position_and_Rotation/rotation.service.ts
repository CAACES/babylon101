import * as BABYLON from 'babylonjs';
import 'babylonjs-materials';

export class RotationService {
  private canvas: HTMLCanvasElement;
  private engine: BABYLON.Engine;
  private camera: BABYLON.ArcRotateCamera;
  private scene: BABYLON.Scene;
  private light: BABYLON.Light;

  private lines: BABYLON.Mesh;

  createScene(elementId: string): void {
    // // The first step is to get the reference of the canvas element from our HTML document
    this.canvas = <HTMLCanvasElement>document.getElementById(elementId);

    // // Then, load the Babylon 3D engine:
    this.engine = new BABYLON.Engine(this.canvas,  true);
  
    // let creatScene = function(){

    // Create the scene space
    this.scene = new BABYLON.Scene(this.engine);
    this.scene.clearColor = new BABYLON.Color4(.5, .5, .5);

    // Add a camera to the scene and attach it to the canvas
    this.camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(5, 3, 0), this.scene);
    this.camera.setPosition(new BABYLON.Vector3(10.253, 5.82251, -9.45717));
    this.camera.attachControl(this.canvas, true);

    // Add lights to the scene
    let light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 0.5, 0), this.scene);
    light.intensity = 0.8;

    //material
    let mat = new BABYLON.StandardMaterial("mat1", this.scene);
    mat.alpha = 1.0;
    mat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 1.0);
    mat.backFaceCulling = false;

/*********************Creations of  Pilot**********************************/
    let pilot = BABYLON.MeshBuilder.CreateCylinder("pilot", {height:0.75, diameterTop:0.2, diameterBottom:0.5,tessellation:6, subdivisions:1}, this.scene);
    let greyMat = new BABYLON.StandardMaterial("grey", this.scene);
    greyMat.emissiveColor = new BABYLON.Color3(0.2,0.2,0.2);
    pilot.material = greyMat;

    let arm = BABYLON.MeshBuilder.CreateBox("arm",{ height: 0.75, width: 0.3, depth: 0.1875 }, this.scene);
    arm.material = greyMat;
    arm.position.x = 0.125;
    arm.parent = pilot;

    let localOrigin = this.localAxes(2);

/*********************End Pilot**********************************/

    pilot.position = new BABYLON.Vector3(2, 3, 4);
    localOrigin.position = pilot.position;

    //rotation order
    pilot.rotation.z = Math.PI/2;
    pilot.rotation.x = Math.PI/2;
    pilot.rotation.y = Math.PI/2;    
    

  // }

  
  this.showWorldAxis(8);
}

localAxes(size: number){
  let pilot_local_axisX = BABYLON.Mesh.CreateLines("pilot_local_axisX", [
    BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
    new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
  ], this.scene);
  pilot_local_axisX.color = new BABYLON.Color3(1, 0, 0);

  let pilot_local_axisY = BABYLON.Mesh.CreateLines("pilot_local_axisY",[
    BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
    new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(0.05 * size, size * 0.95, 0)
  ], this.scene);
  pilot_local_axisY.color = new BABYLON.Color3(0, 1, 0);

  // let pilot_local_axisZ = BABYLON.Mesh.CreateLines("pilot_local_axisZ", [
  //   BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
  //   new BABYLON.Vector3(0, 0, size),new BABYLON.Vector3(0.05 * size, size * 0.95,0)
  // ], this.scene);
  // pilot_local_axisZ.color = new BABYLON.Color3(0, 1, 0);

   let pilot_local_axisZ = BABYLON.Mesh.CreateLines("pilot_local_axisZ",[
    BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, 0.05 * size, size * 0.95),
    new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, 0.05 * size, size * 0.95)
  ], this.scene);
  pilot_local_axisZ.color = new BABYLON.Color3(0, 0, 1);
  
  let local_origin = BABYLON.MeshBuilder.CreateBox("local_origin", { size: 1 }, this.scene);
  local_origin.isVisible = false;

  pilot_local_axisX.parent = local_origin;
  pilot_local_axisY.parent = local_origin;
  pilot_local_axisZ.parent = local_origin;
  
  return local_origin;
}

  animate(): void {
    const $scope = this;

    /* window.addEventListener('DOMContentLoaded', () => {
      $scope.engine.runRenderLoop( () => {
        $scope.scene.render();
      });
    }); */

    $scope.engine.runRenderLoop( () => {
      $scope.scene.render();
    });

    window.addEventListener('resize', () => {
      $scope.engine.resize();
    });
  }

  /**
   * creates the world axes
   *
   * Source: https://doc.babylonjs.com/snippets/world_axes
   *
   * @param size number
   */

  showWorldAxis (size: number) {
    const $scope = this;

    const makeTextPlane = function(text: string, color: string, textSize: number) {
      const dynamicTexture = new BABYLON.DynamicTexture('DynamicTexture', 50, $scope.scene, true);
      dynamicTexture.hasAlpha = true;
      dynamicTexture.drawText(text, 5, 40, 'bold 36px Arial', color , 'transparent', true);
      const plane = BABYLON.Mesh.CreatePlane('TextPlane', textSize, $scope.scene, true);
      const material = new BABYLON.StandardMaterial('TextPlaneMaterial', $scope.scene);
      material.backFaceCulling = false;
      material.specularColor = new BABYLON.Color3(0, 0, 0);
      material.diffuseTexture = dynamicTexture;
      // plane.material = material;

      return plane;
    };

    const axisX = BABYLON.Mesh.CreateLines(
      'axisX',
      [
        BABYLON.Vector3.Zero(),
        new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
        new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
      ],
      this.scene
    );

    axisX.color = new BABYLON.Color3(1, 0, 0);
    const xChar = makeTextPlane('X', 'red', size / 10);
    xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);

    const axisY = BABYLON.Mesh.CreateLines(
      'axisY',
      [
        BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( -0.05 * size, size * 0.95, 0),
        new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( 0.05 * size, size * 0.95, 0)
      ],
      this.scene
    );

    axisY.color = new BABYLON.Color3(0, 1, 0);
    const yChar = makeTextPlane('Y', 'green', size / 10);
    yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);

    const axisZ = BABYLON.Mesh.CreateLines(
      'axisZ',
      [
        BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0 , -0.05 * size, size * 0.95),
        new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0, 0.05 * size, size * 0.95)
      ],
      this.scene
    );

    axisZ.color = new BABYLON.Color3(0, 0, 1);
    const zChar = makeTextPlane('Z', 'blue', size / 10);
    zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);

  }

  
  destroyScene() {
    this.scene.dispose();
  }
}

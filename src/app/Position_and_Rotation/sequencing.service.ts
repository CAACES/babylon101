import * as BABYLON from 'babylonjs';
import 'babylonjs-materials';

export class SequencingService {
  private canvas: HTMLCanvasElement;
  private engine: BABYLON.Engine;
  private camera: BABYLON.ArcRotateCamera;
  private scene: BABYLON.Scene;
  private light: BABYLON.Light;

  private box: BABYLON.Mesh;

  createScene(elementId: string): void {
    // The first step is to get the reference of the canvas element from our HTML document
    this.canvas = <HTMLCanvasElement>document.getElementById(elementId);

    // Then, load the Babylon 3D engine:
    this.engine = new BABYLON.Engine(this.canvas,  true);

    // Create the scene space
    this.scene = new BABYLON.Scene(this.engine);

    // Add a camera to the scene and attach it to the canvas
    this.camera = new BABYLON.ArcRotateCamera('Camera', Math.PI , Math.PI / 8, 150, BABYLON.Vector3.Zero(), this.scene);
    this.camera.attachControl(this.canvas, false);

    // Add lights to the scene
    const light = new BABYLON.HemisphericLight('hemi', new BABYLON.Vector3(0, 1, 0), this.scene);
    // Creation of 3 boxes and 2 spheres
    const box1 = BABYLON.Mesh.CreateBox('Box1', 6.0, this.scene);
    const box2 = BABYLON.Mesh.CreateBox('Box2', 6.0, this.scene);
    const box3 = BABYLON.Mesh.CreateBox('Box3', 6.0, this.scene);
    const box4 = BABYLON.Mesh.CreateBox('Box4', 6.0, this.scene);
    const box5 = BABYLON.Mesh.CreateBox('Box5', 6.0, this.scene);
    const box6 = BABYLON.Mesh.CreateBox('Box6', 6.0, this.scene);
    const box7 = BABYLON.Mesh.CreateBox('Box7', 6.0, this.scene);
   // Moving boxes on the x axis
    box1.position.x = -20;
    box2.position.x = -10;
    box3.position.x = 0;
    box4.position.x = 15;
    box5.position.x = 30;
    box6.position.x = 45;

    // Rotate box around the x axis
    box1.rotation.x = Math.PI / 6;

    // Rotate box around the y axis
    box2.rotation.y = Math.PI / 3;

    // Scaling on the x axis
    box4.scaling.x = 2;

    // Scaling on the y axis
    box5.scaling.y = 2;

    // Scaling on the y axis
    box6.scaling.z = 2;

    // Moving box7 relatively to box1
    box7.parent = box1;
    box7.position.z = -10;



  // this.showWorldAxis(8);
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

import * as BABYLON from 'babylonjs';
import 'babylonjs-materials';

export class PlaneService {
  private canvas: HTMLCanvasElement;
  private engine: BABYLON.Engine;
  private camera: BABYLON.ArcRotateCamera;
  private scene: BABYLON.Scene;
  private light: BABYLON.Light;

  private plane: BABYLON.Mesh;

  createScene(elementId: string): void {
    // The first step is to get the reference of the canvas element from our HTML document
    this.canvas = <HTMLCanvasElement>document.getElementById(elementId);

    // Then, load the Babylon 3D engine:
    this.engine = new BABYLON.Engine(this.canvas,  true);

    // Create the scene space
    this.scene = new BABYLON.Scene(this.engine);

    // Add a camera to the scene and attach it to the canvas
    this.camera = new BABYLON.ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 4, BABYLON.Vector3.Zero(), this.scene);
    this.camera.attachControl(this.canvas, true);

    // Add lights to the scene
    const light1 = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 0), this.scene);
    const light2 = new BABYLON.PointLight('light2', new BABYLON.Vector3(0, 1, -1), this.scene);

    const sourcePlane = new BABYLON.Plane(0, -1, 1, 0);
    sourcePlane.normalize();

    // Add and manipulate meshes in the scene
    const plane = BABYLON.MeshBuilder.CreatePlane('plane', {height: 2, width: 1, sourcePlane: sourcePlane,sideOrientation: BABYLON.Mesh.DOUBLESIDE}, this.scene);

    // generates the world x-y-z axis for better understanding
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
      plane.material = material;

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

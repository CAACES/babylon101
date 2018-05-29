import * as BABYLON from 'babylonjs';
import 'babylonjs-materials';

export class UniversalService {
  private canvas: HTMLCanvasElement;
  private engine: BABYLON.Engine;
  private camera: BABYLON.ArcRotateCamera;
  private scene: BABYLON.Scene;
  private light: BABYLON.Light;

  private sphere: BABYLON.Mesh;

  createScene(elementId: string): void {
    // The first step is to get the reference of the canvas element from our HTML document
    this.canvas = <HTMLCanvasElement>document.getElementById(elementId);

    // Then, load the Babylon 3D engine:
    this.engine = new BABYLON.Engine(this.canvas, true);

    // Create the scene space
    this.scene = new BABYLON.Scene(this.engine);

    // This creates and positions a universal camera (non-mesh)
    const camera = new BABYLON.UniversalCamera('Camera', new BABYLON.Vector3(0, 0, -10), this.scene);

    // This yargets the camera to scene origin
    this.camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    this.camera.attachControl(this.canvas, false);

    // This crastes a light, aiming 0, 1, 0 - to the sky (non-mesh)
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), this.scene);

    // Materils
    const redMat = new BABYLON.StandardMaterial('red', this.scene);
    redMat.diffuseColor = new BABYLON.Color3(255, 0 , 0); // 漫反射颜色
    redMat.emissiveColor = new BABYLON.Color3(255, 0, 0); // 环境光颜色
    redMat.specularColor = new BABYLON.Color3(255, 0, 0); // 高光颜色

    const greenMat = new BABYLON.StandardMaterial('green', this.scene);
    greenMat.diffuseColor = new BABYLON.Color3(0, 255 , 0);
    greenMat.emissiveColor = new BABYLON.Color3(0, 255 , 0);
    greenMat.specularColor = new BABYLON.Color3(0, 255 , 0);

    const blueMat = new BABYLON.StandardMaterial('blue', this.scene);
    blueMat.diffuseColor = new BABYLON.Color3(0, 0 , 255);
    blueMat.emissiveColor = new BABYLON.Color3(0, 0 , 255);
    blueMat.specularColor = new BABYLON.Color3(0, 0 , 255);

    // Shapes
    const plane1 = BABYLON.Mesh.CreatePlane('plane1', 3, this.scene, true, BABYLON.Mesh.DOUBLESIDE);
    plane1.position.x = -3;
    plane1.position.z = 0;
    plane1.material = redMat;

    const plane2 = BABYLON.Mesh.CreatePlane('plane2', 3, this.scene, true, BABYLON.Mesh.DOUBLESIDE);
    plane1.position.x = 3;
    plane1.position.z = -1.5;
    plane1.material = greenMat;

    const plane3 = BABYLON.Mesh.CreatePlane('plane3', 3, this.scene, true, BABYLON.Mesh.DOUBLESIDE);
    plane1.position.x = 3;
    plane1.position.z = 0;
    plane1.material = blueMat;

    const ground = BABYLON.Mesh.CreateGround('ground', 10, 10, 2, this.scene);

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

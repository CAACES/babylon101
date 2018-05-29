import * as BABYLON from 'babylonjs';
import 'babylonjs-materials';

export class DiffuseService {
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
    this.engine = new BABYLON.Engine(this.canvas,  true);

    // Create the scene space
    this.scene = new BABYLON.Scene(this.engine);

    // Add a camera to the scene and attach it to the canvas
    this.camera = new BABYLON.ArcRotateCamera('Camera', -Math.PI / 2, 3 * Math.PI / 16, 15, BABYLON.Vector3.Zero(), this.scene);
    this.camera.attachControl(this.canvas, false);

    const mats = [
      new BABYLON.Color3(1, 1, 0),
      new BABYLON.Color3(1, 0, 1),
      new BABYLON.Color3(0, 1, 1),
      new BABYLON.Color3(1, 1, 1)
    ];

    const redMat = new BABYLON.StandardMaterial('redMat', this.scene);
    redMat.emissiveColor = new BABYLON.Color3(1, 0, 0);

    const greenMat = new BABYLON.StandardMaterial('greenMat', this.scene);
    greenMat.emissiveColor = new BABYLON.Color3(0, 1, 0);

    const blueMat = new BABYLON.StandardMaterial('blueMat', this.scene);
    blueMat.emissiveColor = new BABYLON.Color3(0, 0, 1);

    const whiteMat = new BABYLON.StandardMaterial('whiteMat', this.scene);
    whiteMat.emissiveColor = new BABYLON.Color3(1, 1, 1);

    // groundMat.maxSimultaneousLights = 16;

    for ( let i = 0; i < 4; i++ ) {
      // red light
      const lightRed = new BABYLON.SpotLight('spotLight',
        new BABYLON.Vector3(-Math.cos(Math.PI / 6) - 2.5 + 5 * (i % 2), 1, - Math.sin(Math.PI / 6) + 3.5 - 7 * (Math.floor (i / 2))),
        new BABYLON.Vector3(0, -1, 0), Math.PI / 2, 1.5, this.scene);
      lightRed.diffuse = new BABYLON.Color3(1, 0, 0);
      // green light
      const lightGreen = new BABYLON.SpotLight('spotLight1',
        new BABYLON.Vector3(-2.5 + 5 * (i % 2), 1, - Math.sin(Math.PI / 6) + 4.5 - 7 * (Math.floor(i / 2))),
        new BABYLON.Vector3(0, -1, 0), Math.PI / 2, 1.5, this.scene);
      lightGreen.diffuse = new BABYLON.Color3(0, 1, 0);
      // blue light
      const lightBlue = new BABYLON.SpotLight('spotLight2',
        new BABYLON.Vector3(Math.cos(Math.PI / 6) - 2.5 + 5 * (i % 2), 1, - Math.sin(Math.PI / 6) + 3.5 - 7 * (Math.floor(i / 2))),
        new BABYLON.Vector3(0, -1, 0), Math.PI / 2, 1.5, this.scene);
      lightBlue.diffuse = new BABYLON.Color3(0, 0, 1);
      // white light
      const lightWhite = new BABYLON.SpotLight('spotLight3',
        new BABYLON.Vector3(-2.5 + 5 * (i % 2), 1, 6.5 - 7 * (Math.floor(i / 2))),
        new BABYLON.Vector3(0, -1, 0), Math.PI / 2, 1.5, this.scene);
      lightWhite.diffuse = new BABYLON.Color3(1, 1, 1);

      const redSphere = BABYLON.MeshBuilder.CreateSphere('sphere', {diameter: 0.25}, this.scene);
      redSphere.material = redMat;
      redSphere.position = lightRed.position;

      const greenSphere = BABYLON.MeshBuilder.CreateSphere('sphere', {diameter: 0.25}, this.scene);
      greenSphere.material = greenMat;
      greenSphere.position = lightGreen.position;

      const blueSphere = BABYLON.MeshBuilder.CreateSphere('sphere', {diameter: 0.25}, this.scene);
      blueSphere.material = blueMat;
      blueSphere.position = lightBlue.position;

      const whiteSphere = BABYLON.MeshBuilder.CreateSphere('sphere', {diameter: 0.25}, this.scene);
      whiteSphere.material = whiteMat;
      whiteSphere.position = lightWhite.position;

      const groundMat = new BABYLON.StandardMaterial('groundmat', this.scene);
      groundMat.diffuseColor = mats[i];

      groundMat.maxSimultaneousLights = 16;
      const ground = BABYLON.MeshBuilder.CreateGround('ground', {width: 4, height: 6}, this.scene);
      ground.position.x = -2.5 + 5 * (i % 2);
      ground.position.z = 4.5 - 7 * (Math.floor(i / 2));
      ground.material = groundMat;
    }



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

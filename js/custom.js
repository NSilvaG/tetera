var camera, scene, renderer;
var geometry, material, cubo, mesh;
var controls;

function createCamera() {
  camera = new THREE.PerspectiveCamera(
     100, 
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = -3;
  controls = new THREE.OrbitControls(camera);
}

function createScene() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
}

function createLightPoint() {
  let light = new THREE.PointLight(0xffffff, 0.5);
  light.name = "light";
  light.position.set(0, 10, 0);
  scene.add(light);
}

function loadTetera() {
  const gltfLoader = new THREE.GLTFLoader();
  gltfLoader.load("images/tetera.glb", (miObjeto) => {
    mesh = miObjeto.scene;
    mesh.children[0].material = new THREE.MeshLambertMaterial();
    scene.add(mesh);
    mesh.position.set(-3, 1, 1);
    mesh.name = "objetoGLTF";
    controls.update();
  });
}

function renderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function init() {
  createCamera();
  createScene();
  createLightPoint();
  loadTetera(); 
  renderer();
}

function animate(time) {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

init();
requestAnimationFrame(animate);

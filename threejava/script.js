var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var cube, sphere;
var step=0;

main();

function renderScene() {
step+=0.1;
cube.rotation.x+=0.01;
sphere.position.x=Math.sin(step)*20;

requestAnimationFrame(renderScene);
renderer.render(scene, camera);
}

function main() {


renderer.setClearColor(0xFFFFFF,1.0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);

var axes = new THREE.AxisHelper( 20 );

scene.add(axes);
// Añadir plano
var planeGeometry = new THREE.PlaneGeometry(60,20,1,1);
var planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
var plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.rotation.x=-0.5*Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;
plane.receiveShadow=true;
plane.name = "objeto-" + scene.children.length;
scene.add(plane);
// Añadir cubo
var cubeGeometry = new THREE.CubeGeometry(4,4,4);
var cubeMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
 cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.x = -4;
cube.position.y = 3;
cube.position.z = 0;
cube.castShadow=true;
cube.name = "objeto-" + scene.children.length;
scene.add(cube);
// Añadir esfera
var sphereGeometry = new THREE.SphereGeometry(4,20,20);
var sphereMaterial = new THREE.MeshPhongMaterial({color: 0x7777ff});
sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
sphere.position.x = 20;
sphere.position.y = 4;
sphere.position.z = 2;
sphere.castShadow=true;
sphere.name = "objeto-" + scene.children.length;
scene.add(sphere);




var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( -40, 60, -10 );
spotLight.castShadow=true;
scene.add( spotLight );

// Añadir cámara
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);

$("#canvas").append(renderer.domElement);

renderScene();
}

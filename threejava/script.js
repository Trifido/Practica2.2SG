var scene = new THREE.Scene();
var camera;
var controls;
var renderer = new THREE.WebGLRenderer();
var cube, sphere, terra, luna;
var step=0;

main();

function movimiento_camara() {

	renderer.render(scene, camera.get_object());
	
}

function animate(){
	
	//sphere.rotation.y += 0.01;
	//terra.rotation.y += 0.02;
	//sphere.position.x = Math.sin( sphere.rotation.y) * 20;
	//sphere.position.z = Math.cos( sphere.rotation.y) * 20;
	
	requestAnimationFrame( animate );
	movimiento_camara();
	
}

function main() {
	
	renderer.setClearColor(0xFFFFFF,1.0);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMapEnabled = true;
	renderer.setSize(window.innerWidth, window.innerHeight);
	
	var axes = new THREE.AxisHelper( 20 );
	
	scene.add(axes);
	
	// ************************************************************** //
	// ************************* PLANETAS *************************** //
	
	var sun = new Astro( 8,20,20,"img/sun.jpg" );
	var terra = new Astro( 4,20,20,"img/terra.jpg" );
	var moon = new Astro( 2,20,20,"img/moon.jpg" );
	
	terra.setPosition( 20,0,0 );
	moon.setPosition( 10,0,0 )
	scene.add( sun.sphere );
	sun.add( terra );
	terra.add( moon );
	
	
	// ************************************************************** //
	// ************************* LUCES ****************************** //
	
	var luz1 = new Luz( 0,0xffffff,1,100 );
	luz1.set_position( -40, 60, -10 );
	luz1.shadow( true );
	
	var luz2 = new Luz( 0,0xafffff,1,100 );
	luz2.set_position( 40, 30, 10 );
	luz2.shadow( true );
	
	scene.add( luz1.get_object() );
	scene.add( luz2.get_object() );
	
	// ************************************************************** //
	// ************************* Camara ***************************** //
	
	camera = new Camara( 45,0.1, 1000 );
	camera.setPosition( -30,40,30 );
	camera.setUp( new THREE.Vector3( 0,1,0 ) );
	camera.setView( new THREE.Vector3( 0,0,0 ) );
	
	controls = new THREE.OrbitControls( camera.get_object() );
	controls.damping = 0.2;
	controls.addEventListener( 'change', movimiento_camara );
	
	// ************************************************************** //
	
	$("#canvas").append(renderer.domElement);
	
	animate();
}

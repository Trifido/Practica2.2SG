var scene = new THREE.Scene();
var camera;
var teclado;
var controls;
var renderer = new THREE.WebGLRenderer();
var universe;
var pushed = false;

main();

function movimiento_camara() {

	renderer.render(scene, camera.get_object());
	
}

function actualizarTeclado(){
	
	teclado.update();
	
	if ( teclado.down("R") ){
		
		if( pushed )
			pushed = false;
		else
			pushed = true;
		
	}
	if( teclado.down("A") )
		alert( "Autores: Alberto & Vicente" );
		
	
}

function animate(){
	
	// ****************
	// Rotacion del background
	scene.children[0].rotateY( 0.001 );
	// Rotacion del sol
	universe.getChild( 0 ).rotateY( 0.01 );
	// ****************
	// Rotaciones de la tierra
	// El grupo
	universe.getChild( 1 ).rotateY( 0.02 );
	// La esfera
	universe.getChild( 1 ).children[0].rotation.y += 0.03;
	// ****************
	// Rotaciones de la luna
	// El grupo
	if( !pushed )	
		universe.getChild( 1 ).children[1].rotation.y += 0.01;
	// La esfera
	universe.getChild( 1 ).children[1].children[0].rotateY( 0.01 );
	
	// ****************
	requestAnimationFrame( animate );
	movimiento_camara();
	actualizarTeclado();
	
}

function onWindowResize() {

	renderer.setSize( window.innerWidth, window.innerHeight );
	camera.aspect(window.innerWidth / window.innerHeight);
	camera.updateProjectionMatrix();
	
}

function main() {
	
	renderer.setClearColor(0xFFFFFF,1.0);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMapEnabled = true;
	renderer.setSize(window.innerWidth, window.innerHeight);
	
	// ************************************************************** //
	// ************************* FONDO ***************************** //
	
	var space = new Astro( 90,90,90,"space" );
	
	scene.add( space.sphere );
	
	// ************************************************************** //
	// ************************* PLANETAS *************************** //
	
	universe = new Grupo();
	
	var sun = new Astro( 8,20,20,"sun" );
	universe.addastro( sun );
	sun.setShadow( false );
	
	var terragrupo = new Grupo( "terragrupo" );
	var terra = new Astro( 2,20,20,"terra" );
	terragrupo.setPosition( 0,0,0 );
	terra.setPosition( 20,0,0 );
	terragrupo.addastro( terra );
	universe.addgrupo( terragrupo );
	
	var moongrupo = new Grupo( "moongrupo" );
	var moon = new Astro( 0.5,20,20,"moon" );
	moongrupo.setPosition( 20,0,0 );
	moon.setPosition( 5,0,0 );
	moongrupo.addastro( moon );
	terragrupo.addgrupo( moongrupo );
	
	scene.add( universe.group );

	// ************************************************************** //
	// ************************* LUCES ****************************** //

	// Luz del sol
	var luz = new Luz( 1,0xafffff,2,1000 );
	luz.set_position( 0, 0, 0 );
	luz.shadow( true );

	scene.add( luz.get_object() );
	
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
	// ************************* Camara ***************************** //
	
	teclado = new KeyboardState();
	
	// ************************************************************** //
	
	window.addEventListener( 'resize', onWindowResize, false );
	$("#canvas").append(renderer.domElement);
	
	animate();
}

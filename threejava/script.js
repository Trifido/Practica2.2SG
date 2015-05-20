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


function main() {
	
	renderer.setClearColor(0xFFFFFF,1.0);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMapEnabled = true;
	renderer.setSize(window.innerWidth, window.innerHeight);
	
	//var axes = new THREE.AxisHelper( 20 );
	
	//scene.add(axes);
	
	// ************************************************************** //
	// ************************* FONDO ***************************** //
	
	var space = new Astro( 8,20,20,"space" );
	
	scene.add( space.sphere );
	
	// ************************************************************** //
	// ************************* PLANETAS *************************** //
	
	universe = new Grupo();
	
	var sun = new Astro( 8,20,20,"sun" );
	universe.addastro( sun );
	sun.setShadow( false );
	
	var terragrupo = new Grupo( "terragrupo" );
	var terra = new Astro( 4,20,20,"terra" );
	terragrupo.setPosition( 0,0,0 );
	terra.setPosition( 20,0,0 );
	terragrupo.addastro( terra );
	universe.addgrupo( terragrupo );
	
	var moongrupo = new Grupo( "moongrupo" );
	var moon = new Astro( 2,20,20,"moon" );
	moongrupo.setPosition( 20,0,0 );
	moon.setPosition( 10,0,0 );
	moongrupo.addastro( moon );
	terragrupo.addgrupo( moongrupo );
	
	scene.add( universe.group );

	// ************************************************************** //
	// ************************* LUCES ****************************** //
	// Luz test
	//var luz1 = new Luz( 0,0xffffff,1,100 );
	//luz1.set_position( 0, 0, 0 );
	//luz1.shadow( true );
	
	// Luz del sol
	var luz2 = new Luz( 1,0xafffff,2,100 );
	luz2.set_position( 0, 0, 0 );
	luz2.shadow( true );

	//scene.add( luz1.get_object() );
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
	// ************************* Camara ***************************** //
	
	teclado = new KeyboardState();
	
	
	// ************************************************************** //
	
	$("#canvas").append(renderer.domElement);
	
	animate();
}

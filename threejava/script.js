var scene = new THREE.Scene();
var camera;
var teclado;
var controls;
var renderer = new THREE.WebGLRenderer();
var oLoader = new THREE.OBJMTLLoader();
var universe;
var pushed = false;
var acelerar = 0;
var rotar = 0;
var model;

var object;
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
		
	}else if( teclado.pressed("W") ){
	
		acelerar -= 1;
			
	}else if( teclado.pressed("S") ){
		
		acelerar += 1;
		
	}else if( teclado.pressed("A") ){
		
		rotar += 0.1;
		
	}else if( teclado.pressed("D") ){
		
		rotar -= 0.1;
		
	}else if( teclado.down("V") )
		alert( "Autores: Alberto & Vicente" );
		
	
}

function animate( ){
	
	// ****************
	// Rotacion del background
	scene.children[0].rotateY( 0.001 );
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
	// Rotacion de marte
	// El grupo
	universe.getChild( 2 ).getObjectByName( "martegrupo" ).rotation.y += 0.01;
	// La esfera
	universe.getChild( 2 ).getObjectByName( "martegrupo" ).getObjectByName( "marte" ).rotateY( 0.01 );
	// Satelites: Deimos
	//grupo
	universe.getChild( 2 ).getObjectByName( "martegrupo" ).getObjectByName( "deimosgrupo" ).rotation.y += 0.01 ;
	//esfera
	universe.getChild( 2 ).getObjectByName( "martegrupo" ).getObjectByName( "deimosgrupo" ).getObjectByName( "deimos" ).rotateY( 0.01 );
	// Satelites: phobos
	//grupo
	universe.getChild( 2 ).getObjectByName( "martegrupo" ).getObjectByName( "phobosgrupo" ).rotation.y += 0.02 ;
	//esfera
	universe.getChild( 2 ).getObjectByName( "martegrupo" ).getObjectByName( "phobosgrupo" ).getObjectByName( "phobos" ).rotateY( 0.01 );
	// ****************
	// Rotacion de jupiter
	// el grupo
	universe.getChild( 3 ).getObjectByName( "jupitergrupo" ).rotation.y += 0.005;
	// La esfera
	universe.getChild( 3 ).getObjectByName( "jupitergrupo" ).getObjectByName( "jupiter" ).rotateY( 0.01 );
	// ****************
	// Rotacion de jupiter
	// el grupo
	universe.getChild( 4 ).getObjectByName( "venusgrupo" ).rotation.y += 0.03;
	// La esfera
	universe.getChild( 4 ).getObjectByName( "venusgrupo" ).getObjectByName( "venus" ).rotateY( 0.07 );
	// ****************
	// Rotacion de jupiter
	// el grupo
	universe.getChild( 5 ).getObjectByName( "mercuriogrupo" ).rotation.y += 0.05;
	// La esfera
	universe.getChild( 5 ).getObjectByName( "mercuriogrupo" ).getObjectByName( "mercurio" ).rotateY( 0.07 );
	// ****************
	// Rotacion de saturno
	// el grupo
	universe.getChild( 6 ).getObjectByName( "saturnogrupo" ).rotation.y += 0.015;
	// La esfera
	universe.getChild( 6 ).getObjectByName( "saturnogrupo" ).getObjectByName( "saturno" ).rotateY( 0.01 );
	// ****************
	// Rotacion de neptuno
	// el grupo
	universe.getChild( 7 ).getObjectByName( "neptunogrupo" ).rotation.y += 0.006;
	// La esfera
	universe.getChild( 7 ).getObjectByName( "neptunogrupo" ).getObjectByName( "neptuno" ).rotateY( 0.01 );
	// ****************
	
	// MOVIMIENTO DE LA NAVE: 
	//alert(scene.getChild( 1 ).name);//.position.z += aceleracion;
	//object.position.z += aceleration;
	
	model.rotation.y = rotar;
	model.position.z = acelerar * Math.cos(rotar);
	model.position.x = acelerar * Math.sin(rotar);
	
	
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
	
	var space = new Astro( 200,90,90,"space" );
	scene.add( space.sphere );
	
	// ************************************************************** //
	// ************************* PLANETAS *************************** //
	
	universe = new Grupo();
	
	var sun = new Astro( 13,90,90,"sun" );
	universe.addastro( sun );
	sun.setShadow( false );
	
	var terragrupo = new Grupo( "terragrupo" );
	var terra = new Astro( 2,20,20,"terra" );
	terragrupo.setPosition( 0,0,0 );
	terra.setPosition( 40,0,0 );
	terragrupo.addastro( terra );
	universe.addgrupo( terragrupo );
	
	var moongrupo = new Grupo( "moongrupo" );
	var moon = new Astro( 0.5,20,20,"moon" );
	moongrupo.setPosition( 40,0,0 );
	moon.setPosition( 5,0,0 );
	moongrupo.addastro( moon );
	terragrupo.addgrupo( moongrupo );
	
	var martegrupo = new Grupo( "martegrupo" );
	var phobosgrupo = new Grupo( "phobosgrupo" );
	var deimosgrupo = new Grupo( "deimosgrupo" );
	var marte = new Astro( 1.5,20,20,"marte" );
	var phobos = new Astro( 0.3,20,20,"phobos" );
	var deimos = new Astro( 0.5,20,20,"deimos" );
	martegrupo.setPosition( 0,0,0 );
	phobosgrupo.setPosition( 50,0,0 );
	deimosgrupo.setPosition( 50,0,0 );
	marte.setPosition( 50,0,0 );
	phobos.setPosition( 3,0,0 );
	deimos.setPosition( 5,0,0 );
	martegrupo.addastro( marte );
	deimosgrupo.addastro( deimos );
	phobosgrupo.addastro( phobos );
	martegrupo.addgrupo( deimosgrupo );
	martegrupo.addgrupo( phobosgrupo );
	universe.addgrupo( martegrupo );
	
	var jupitergrupo = new Grupo( "jupitergrupo" );
	var jupiter = new Astro( 5.5,20,20,"jupiter" );
	jupitergrupo.setPosition( 0,0,0 );
	jupiter.setPosition( 80,0,0 );
	jupitergrupo.addastro( jupiter );
	universe.addgrupo( jupitergrupo );
	
	var venusgrupo = new Grupo( "venusgrupo" );
	var venus = new Astro( 2,20,20,"venus" );
	venusgrupo.setPosition( 0,0,0 );
	venus.setPosition( 25,0,0 );
	venusgrupo.addastro( venus );
	universe.addgrupo( venusgrupo );
	
	var mercuriogrupo = new Grupo( "mercuriogrupo" );
	var mercurio = new Astro( 1,20,20,"mercurio" );
	mercuriogrupo.setPosition( 0,0,0 );
	mercurio.setPosition( 19,0,0 );
	mercuriogrupo.addastro( mercurio );
	universe.addgrupo( mercuriogrupo );
	
	var saturnogrupo = new Grupo( "saturnogrupo" );
	var saturno = new Astro( 4,20,20,"saturno" );
	var torus1 = new Anillo( 7, 0.2, 16, 100,"anillo" );
	var torus2 = new Anillo( 9, 0.2, 16, 100,"anillo" );
	var torus3 = new Anillo( 11, 0.2, 16, 100,"anillo" ); 
	torus1.rotateX( 3.14/2 );
	torus2.rotateX( (3.14/2) );
	torus3.rotateX( (3.14/2) );
	saturnogrupo.setPosition( 0,0,0 );
	saturno.setPosition( 98,0,0 );
	saturno.addanillo( torus1 );
	saturno.addanillo( torus2 );
	saturno.addanillo( torus3 );
	saturnogrupo.addastro( saturno );
	universe.addgrupo( saturnogrupo );
	
	var neptunogrupo = new Grupo( "neptunogrupo" );
	var neptuno = new Astro( 5,20,20,"neptuno" );
	neptunogrupo.setPosition( 0,0,0 );
	neptuno.setPosition( 120,0,0 );
	neptunogrupo.addastro( neptuno );
	universe.addgrupo( neptunogrupo );
	
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
	
	oLoader.load('obj/ARC170.obj', 'obj/ARC170.mtl', function(object) {
	
		object.position.y = 30;
		//object.position.z = 20;
		object.scale.set(0.01, 0.01, 0.01);
		
		model = object;
		scene.add( model );
		
		animate();
	});
	
	window.addEventListener( 'resize', onWindowResize, false );
	$("#canvas").append(renderer.domElement);
	
	
	
}

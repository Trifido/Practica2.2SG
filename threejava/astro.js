
function Astro( radio, var1, var2,url ){

	this.geometry = new THREE.SphereGeometry( radio,var1,var2 );
	this.texture = THREE.ImageUtils.loadTexture( "img/" + url + ".jpg");
	
	this.material = new THREE.MeshPhongMaterial({map: this.texture});
	this.sphere = new THREE.Mesh( this.geometry,this.material );
	
	this.sphere.position.set( 0,0,0 );
	this.sphere.castShadow = true;
	this.sphere.name = url;
	
}

Astro.prototype.addastro = function( astro ){
	
	this.sphere.add( astro.sphere );
	
}

Astro.prototype.addgrupo = function( grupo ){
	
	this.sphere.add( grupo.group );
	
}

Astro.prototype.setPosition = function( x,y,z ){
	
	this.sphere.position.set( x,y,z );
	
}

Astro.prototype.rotateX = function( val ){
	
	this.sphere.rotation.x += val;
	
}

Astro.prototype.rotateY = function( val ){
	
	this.sphere.rotation.y += val;
	
}

Astro.prototype.rotateZ = function( val ){
	
	this.sphere.rotation.z += val;
	
}

Astro.prototype.getChild = function( id ){
	
	//return this.sphere.children[id];	
	
}



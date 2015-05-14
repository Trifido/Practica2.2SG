
function Camara( fov,near,far ){
	
	this.object = new THREE.PerspectiveCamera( fov, window.innerWidth / window.innerHeight, near, far );
	
}

Camara.prototype.get_object = function(){

	return this.object;	
	
}

Camara.prototype.setPosition = function( x,y,z ){

	this.object.position.set(x,y,z);
	
}

Camara.prototype.setUp = function( up ){

	this.object.up = up;

}
Camara.prototype.setView = function( at ){

	this.object.lookAt( at );
		
}

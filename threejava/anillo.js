
function Anillo( radio_ext,radio_int,var1,var2 ,url ){
	
	this.geometry = new THREE.TorusGeometry( radio_ext, radio_int, var1, var2 ); 
	this.texture = THREE.ImageUtils.loadTexture( "img/" + url + ".jpg");
	
	this.material = new THREE.MeshLambertMaterial({map: this.texture});
	
	this.object = new THREE.Mesh( this.geometry, this.material );
	
	this.material.side = THREE.DoubleSide;
	
}

Anillo.prototype.rotateX = function( val ){
	
	this.object.rotation.x += val;
	
}

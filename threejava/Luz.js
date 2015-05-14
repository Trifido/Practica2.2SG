
function Luz( tipo,color,intensity,distance ){
	
	this.tipo = tipo;
	this.object;
	this.color = color;
	
	if( this.tipo == 0 )
		this.object = new THREE.SpotLight( this.color );
	else if( this.tipo == 1 )
		this.object = new THREE.PointLight( this.color,intesity,distance );
	
}

Luz.prototype.shadow = function( status ){
	
	this.object.castShadow = status;
	
}

Luz.prototype.set_position = function( x,y,z ){
	
	this.object.position.set( x,y,z );
	
}

Luz.prototype.get_object = function(){

	return this.object;	
	
}

function Grupo( url ){
	
	this.group = new THREE.Object3D();
	this.group.name = url;
	
}

Grupo.prototype.animar = function( val ){
		
	this.group.rotation.y += val;
		
}

Grupo.prototype.addastro = function( thing ){
		
	this.group.add( thing.sphere );
		
}

Grupo.prototype.addgrupo = function( thing ){
		
	this.group.add( thing.group );
		
}

Grupo.prototype.getChild = function( id ){
	
	return this.group.children[id];	
	
}
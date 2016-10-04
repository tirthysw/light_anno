// JavaScript Document


//=======================================================================================
// Anchor class
//=======================================================================================
var anchor = function(spec){
	
	var that={
		imgX:spec.imgY || -1, //real img location
		imgY:spec.imgX || -1, //real img location
		group:spec.group,
		layer:spec.layer,
	};
	
	var parent = spec.parent
	
	//add into group
	group.add(anchor);
	
	anchor.mybindingTarget=options.bindingPoint;
	options.bindingPoint.bindingarchor = anchor;
	anchor.mybindingTarget.x=anchor.attrs.x;
	anchor.mybindingTarget.y=anchor.attrs.y;
	
	anchor.annoObj = options.annoObj;
	
	anchor.on("dragmove", function() {
	  //update(group, this);  --force rigid
	  this.mybindingTarget.x=this.attrs.x;
	  this.mybindingTarget.y=this.attrs.y;
	  layer.draw();
	});
	
	anchor.on("mousedown touchstart", function() {
		group.prevDrag = group.getDraggable()
		group.setDraggable(false); 
		this.moveToTop();			
	});

	anchor.on("dragend", function() {
	  group.setDraggable(group.prevDrag);
	  
	  this.mybindingTarget.x=this.attrs.x;
	  this.mybindingTarget.y=this.attrs.y;
	  layer.draw();
	});
	
	// add hover styling
	anchor.on("mouseover", function() {
	  var layer = this.getLayer();
	  document.body.style.cursor = "pointer";
	  this.setAttr('radius',8);
	  
	  if(this.isDraggable()){
		this.moveToTop();			
		this.setStrokeWidth(4);
	  }
	  
	  layer.draw();
	});
	anchor.on("mouseout", function() {
	  var layer = this.getLayer();
	  document.body.style.cursor = "default";
	  this.setAttr('radius',6);
	  this.setStrokeWidth(0.5);
	  layer.draw();
	});
}
 
//======================================================================================
	bottomFace = spec.bottomFace || new BoxFace() ;
	topFace = spec.topFace || new BoxFace() ;
	bindingKObj = spec.bindingKObj  || undefined ;
	polypoints = spec.polypoints 	|| [] ;
	spaceCornerPoints = spec.spaceCornerPoints || [] ; 
	
//=====================================================================================
//constructor of basicAnnoObject
var basicAnnoObj = function(spec){

	var that={
		anno_class = spec.anno_class || 'basic_anno',
		tagName = spec.tagName || undefined ,
		machine = spec.machine || undefined ,
		anchor = spec.anchor   || [] ,
		objLayer = spec.objLayer ,
		shape =  spec.shape ||  undefined ,
		group = spec.group  || new Kinetic.Group({
			x: 0,
			y: 0,
			draggable: true 		
		})
	};
	
	that.setVisible = function (){
		console.log('unimplement');
	}
	
	that.lockDarg = function(){
		console.log('unimplement');	
	}
	
	that.unlockDarg = function(){
		console.log('unimplement');	
	}
	// exampale of set that.privaite_member_a  
	//that.get_a = function (){ return spec.a; }
	return that;
};

//constructor of spaceCornerAnnoObj
var spaceCornerAnnotation = function(spec){

	spec.anno_class = 'space_corner';
	var that = basicAnnoObj({parent:this});
	that.
	
	//---------------------------------------------------	
	//---------------------------------------------------
	//add memeber of space corner annotation
	
	//add shape
	
	//add 4 x dots
	
	
	that.setVisible = function (){
		
	}	
	
	//---------------------------------------------------
	return that;
};


//constructor of spaceCornerAnnoObj
var boxProxyAnnotation = function(spec){

	spec.anno_class = 'box_proxy';
	var that = basicAnnoObj(spec);

	//---------------------------------------------------
	
	//---------------------------------------------------
	//add memeber of space corner annotation
	
	//add 4x2 dots
	
	var center = anchor(spec)
	
	//add 2x shape : top face and bottom face
	
	
	that.setVisible = function (){
		
	} 
	
	
	//---------------------------------------------------
	return that;
};
// JavaScript Document

//state text

var addboxtext = 
           '//* |    6-------------5            6-----------5\n'+
           '//* |    |\\            |\\          /           /|\n'+
           '//* |    | 1-------------         1-----------  |\n'+
           '//* |    | |           | |        |           | |\n'+
           '//* |      |-----------4 |        |           | 4\n'+
           '//* |     \\|            \\|        |           | /\n'+
           '//* |      2-------------3        2-----------3  \n' ;

//some utilites

function writeMessage(messageLayer, message) {
        var context = messageLayer.getContext();
        messageLayer.clear(); 
        //context.fillRect(0, 0, 300, 40);
        context.font = "12pt Calibri";
        context.fillStyle = "white";
        context.fillText(message, 10, 30);
}
function boundingFunction(sX,sY,bX,bY){
	 
}

//----------------------------------------------------------
function Points(options){
	this.x= options.x || -1 ;
	this.y= options.y || -1;
}
function BoxFace(){
	this.points =[] 
}

function AnnoObject( options ) { 
	// some defaults
	this.tagName = options.tagName || undefined ;
	this.machine = options.machine || undefined ;
	this.bottomFace = options.bottomFace || new BoxFace();
	this.topFace = options.topFace || new BoxFace();
	this.bindingKObj = options.bindingKObj || undefined ;
	this.polypoints = options.polypoints || [] ;
	this.spaceCornerPoints = options.spaceCornerPoints || [] ;
	this.anchor = options.anchor || [];
	this.objLayer = options.objLayer;
	this.shape =  options.shape ||  undefined ;
	this.group = options.group || new Kinetic.Group({
			x: 0,
			y: 0,
			draggable: true 		
	}); 
} 

function drawVerticalLine(context,pointsA,pointsB){
	//-------------
	// draw outline
	//-------------
	context.strokeStyle='rgba(200,200,255,0.5)';
	context.beginPath();
	for( var iv =0 ; iv < 4 ; iv++ ){
		context.moveTo( pointsA[iv].x , pointsA[iv].y );
		context.lineTo( pointsB[iv].x , pointsB[iv].y );
	}			
 
	context.closePath(); 
    //repatch 1004
	//this.stroke(context);
	context.fillStrokeShape(this);

}

function drawSpaceTriangle(context, points){
	//--------------
	// draw Triangle
	//--------------
	
	//draw line
	if( points.length > 2 ){
		
		context.beginPath();
		for( var iv =1 ; iv < points.length ; iv++ ){
			context.moveTo( points[0].x , points[0].y );
			context.lineTo( points[iv].x , points[iv].y );			 
		} 
		context.closePath(); 
		//repatch 1004
		//this.stroke(context);
		context.fillStrokeShape(this);
	 
		//draw shape
		context.beginPath();
		context.moveTo( points[0].x , points[0].y );
		context.lineTo( points[2].x , points[2].y );
		context.lineTo( points[1].x , points[1].y );
		context.closePath();
		
		//repatch 1004
		//this.fill(context);	
		context.fillStrokeShape(this);

		context.beginPath();
		context.moveTo( points[0].x , points[0].y );
		context.lineTo( points[3].x , points[3].y );
		context.lineTo( points[2].x , points[2].y );
		context.closePath();
		
		//repatch 1004
		//this.fill(context);	
		context.fillStrokeShape(this);
	 
	}
	
}

function drawOutline(context,points){
	//-------------
	// draw outline
	//-------------
	context.beginPath();
    
	if( points.length > 1 ){
		context.moveTo( points[0].x , points[0].y );
		for( var iv =0 ; iv < points.length ; iv++ ){
			context.lineTo( points[iv].x , points[iv].y );
			//context.lineTo( points[(iv+1)%4].x ,points[(iv+1)%4].y );
		} 
		context.closePath();

		this.fill(context);	

		//repatch 1004
		//this.stroke(context);
		context.fillStrokeShape(this);
		
	}
}

function createNewSpaceCorner(sMachine,kinStage ,annoLayer){
	
	var annoObj = new AnnoObject({ 
		bottomFace:[],topFace:[], objLayer:annoLayer });
		
	annoObj.annoClass = 'SpaceProxy'; 
	annoObj.shape=cornerShape;
	var group = annoObj.group;	
 
	//add point
	var spacePoint=[ {x:200,y:200} , 
					 {x:200-50,y:200+15} , 
				     {x:200,y:200-70} , 
				     {x:200+50,y:200+15}] ;
	
	for(var i=0 ;i<4 ; i++ ){
		annoObj.spaceCornerPoints.push( spacePoint[i]  );
		
		var newAnchor = createAnchor({
			x:spacePoint[i].x , y:spacePoint[i].y , visible:true , 
			bindingPoint:spacePoint[i],
			group:annoObj.group,
			layer:annoLayer,
			annoObj:annoObj
		});
			
		annoObj.anchor.push( newAnchor ); 
	}
	//specail handle center point
	annoObj.anchor[0].setFill( 'rgb(240,10,10)' );
	 
	//------------------------------------------
	// add shape
	var cornerShape = new Kinetic.Shape({
			drawFunc: function(context) {
				drawSpaceTriangle.apply(this,[context,annoObj.spaceCornerPoints]);
			},
			name:'shape',
			fill: 'rgba(200, 255, 200, 0.2)',
			stroke: 'rgba(0, 255, 0, 1)',
			strokeWidth: 2
    }); 
	cornerShape.on("mouseover", function() {
          var layer = this.getLayer();
          document.body.style.cursor = "pointer";
		  this.setAttr('radius',8); 

		  //patch 1004 > if(this.isDraggable()){
		  if(this.draggable){
			this.moveToTop();		 
		  }
		  
          this.getLayer().draw();
    });
    cornerShape.on("mouseout", function() {
          var layer = this.getLayer();
          document.body.style.cursor = "default"; 
          this.getLayer().draw();
    });
	
	annoObj.shape=cornerShape;
	
	group.add(cornerShape);
	
	//-----------move top
	for( var i in annoObj.anchor){
		annoObj.anchor[i].moveToTop();
	}

	annoLayer.add(group);
	
	
	return annoObj;
}

function createNewPolyProxy( stateMachine, annoLayer){
 
	var annoObj = new AnnoObject({ 
		bottomFace:[],topFace:[], objLayer:annoLayer });
		
	annoObj.annoClass = 'PolyProxy';
	
	var polyShape = new Kinetic.Shape({
			drawFunc: function(context) {
						drawOutline.apply(this,[context,annoObj.polypoints]);
			},
			name:'shape',
			fill: 'rgba(200, 255, 200, 0.4)',
			stroke: 'rgba(200, 200, 200, 0.9)',
			strokeWidth: 2
    }); 
	annoObj.polyShape=polyShape;
	var group = annoObj.group;	
 
	
	group.add(polyShape);


	annoLayer.add(group);
	
	return annoObj;
}

function appendPolyPoint(polyProxy, newPoint ){

	polyProxy.polypoints.push( newPoint );
	var newAnchor = createAnchor({
		x:newPoint.x , y:newPoint.y ,visible:true , 
		bindingPoint:newPoint,
		group:polyProxy.group,
		layer:polyProxy.objLayer,
		annoObj:annoObj
		});
		
	polyProxy.anchor.push( newAnchor );

}

function createAnchor( options ) {
    
		var anchor = new Kinetic.Circle({
          x: options.x,
          y: options.y,
          stroke: options.stroke || "#66FFCC",
          fill: options.fillColor || "#3333FF",
          strokeWidth: 0.5,
          radius: 6,
          name: name,
          draggable: true,
		  visible: options.visible || false,
		  dragBoundFunc: function(pos) {			 
				return pos;
			}
        });
		
		// bind other important DATA MEMBER
		if( options.bindingPoint === undefined )
			alert(' ERROR undefined bindingPoint');
		if( options.group === undefined )
			alert(' ERROR undefined group');
		if( options.layer === undefined )
			alert(' ERROR undefined layer');
		
		var group = options.group;
		var layer = options.layer;
		
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
		  
		  /*
		  if(this.isDraggable()){
			this.moveToTop();			
			this.setStrokeWidth(4);
		  }
		  */
		  // patch for kineticJS v5.
		  if(this.draggable){
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
	
	return anchor;
}

function addNewBoxProxy(machine, kstage,  objLayer ){
	
	if( kstage === undefined )
		alert('undefined error addNewBoxProxy');
	
	
	var annoObj = new AnnoObject({machine:machine,objLayer:objLayer });
	annoObj.annoClass = 'BoxProxy';
	
	var group = annoObj.group;
	
	//the initial X and Y
	var dx=60;
	var dy=50;
	var ini_x=[ 100-dx,	100,	100+dx,	100];
	var ini_y=[ 100,	100+dy,	100,	100-dy];
	//options.fillColor

	var colors = [ 'red', 'yellow' , 'green' , 'blue' ];
	
	//initial bottom face
	for( var i=0 ; i<4 ; i++){
		
		annoObj.bottomFace.points[i]= new Points({x:ini_x,y:ini_y});
		
		annoObj.anchor.push(  createAnchor({
			x:ini_x[i],
			y:ini_y[i],
			name:i.toString(), 
			stage:kstage,
			fillColor:colors[i],
			group:group, 
			visible:false,
			bindingPoint: annoObj.bottomFace.points[i],
			layer:objLayer,
			annoObj:annoObj
			})
		);
	}
	
	var dy=-50;
	var dx=0;
	//----------------------------------------------
	//initial top face
	for( var i=0 ; i<4 ; i++){
		annoObj.topFace.points[i]= new Points({x:ini_x,y:ini_y});
		
		annoObj.anchor.push(  createAnchor({
			x:ini_x[i]+dx,
			y:ini_y[i]+dy,
			name:i.toString() , 
			stage:kstage ,
			group:group, 
			fillColor:colors[i],
			visible:true,
			bindingPoint: annoObj.topFace.points[i],
			layer:objLayer,
			annoObj:annoObj
			
			}) 
		);
		 
	}
	//----------------------------------------------
	// add bottom face shpae 
		var botFaceShape = new Kinetic.Shape({
			drawFunc: function(context) {
					drawOutline.apply(this,[context,annoObj.bottomFace.points]);
					//trick here
					drawVerticalLine.apply(this,[context,annoObj.topFace.points,annoObj.bottomFace.points]);	
				},
			name:'shape',
			fill: 'rgba(200, 255, 0, 0.2)',
			stroke: 'rgba(0,255,100,0.5)',
			visible:false,
			strokeWidth: 2
        });
		group.add(botFaceShape);
		annoObj.bottomFace.shape = botFaceShape;
		
		
		botFaceShape.on('mouseout' , function(e){ 
          document.body.style.cursor = "default";
		});
		botFaceShape.on('mouseover' , function(e){ 
          document.body.style.cursor = "pointer";
		});
	//-----------------------------------------------
	//----------------------------------------------
	// add top face shpae 
		//*
		var topFaceShape = new Kinetic.Shape({
			drawFunc: function(context) {
					drawOutline.apply(this,[context,annoObj.topFace.points]); 
								
				},
			name:'shape',
			fill:'rgba(0, 255, 200, 0.2)',
			stroke: 'rgba(0,255,100,0.5)',
			visible:true,
			strokeWidth: 2
        });
		
		topFaceShape.on('mouseover' , function(e){ 
          document.body.style.cursor = "pointer";
		});
		topFaceShape.on('mouseout' , function(e){ 
          document.body.style.cursor = "default";
		});
		annoObj.topFace.shape = topFaceShape;
		group.add(topFaceShape);
	//*/
	
	group.on("dragstart", function() {
        this.moveToTop();
    });
	
	//-----------move top
	
	for( var i in annoObj.anchor){
		annoObj.anchor[i].moveToTop();
	}
	//--
	
	objLayer.add(group);
	 
	kstage.draw();	

	
	return annoObj;
}

function lockSpaceCornerProxy(scProxy){
	for(var i=0 ; i < scProxy.spaceCornerPoints.length ; i++){ 
		scProxy.spaceCornerPoints[i].bindingarchor.setVisible(false); 
	}
	
	scProxy.shape.setDraggable(false) ; 
	scProxy.shape.attrs.fill='rgba(150,150,150,0)';
	scProxy.shape.attrs.stroke='rgba(20,200,100,0.5)';
	scProxy.shape.setDraggable(false);
	scProxy.group.setDraggable(false);
	scProxy.group.getStage().draw();
}
 
function lockPolyProxy(polyProxy){
	for(var i=0 ; i < polyProxy.polypoints.length ; i++){ 
		polyProxy.polypoints[i].bindingarchor.setVisible(false); 
	}
	polyProxy.polyShape.attrs.fill='rgba(150,150,150,0)';
	polyProxy.polyShape.attrs.stroke='rgba(20,200,100,0.5)';
	polyProxy.polyShape.setDraggable(false) ; 
	polyProxy.group.setDraggable(false);
	polyProxy.group.getStage().draw();
}

function lockBoxProxy(boxProxy){
	for(var i=0 ; i < 4 ; i++){ 
		boxProxy.topFace.points[i].bindingarchor.setVisible(false);
		boxProxy.bottomFace.points[i].bindingarchor.setVisible(false);
	}
	boxProxy.topFace.shape.attrs.fill='rgba(150,150,150,0)';
	boxProxy.topFace.shape.attrs.stroke='rgba(20,200,100,0.5)';
	boxProxy.topFace.shape.setDraggable(false) ;
	boxProxy.bottomFace.shape.attrs.fill='rgba(150,150,150,0)';
	boxProxy.bottomFace.shape.attrs.stroke='rgba(20,200,100,0.5)';
	boxProxy.bottomFace.shape.setDraggable(false) ;
	boxProxy.group.setDraggable(false);
	boxProxy.group.getStage().draw();
}

function turnOffAllMouseEvent( kobj )
{
	kobj.off('click mouseover mouseout mousein');
	
	if( kobj.getChildren !== undefined ){
		var chs = kobj.getChildren();
		var tam_i=0;
		for( tam_i =0 ; tam_i < chs.length ; tam_i = tam_i+1 ){
			chs[tam_i].off('click mouseover mouseout mousein');
		}
	}
}

function hideAllproxy( proxylist , machine , opts ){
	
	for( var i=0 ; i < proxylist.length ; i++){
		
		if(opts.skipCurrent && machine.currentProxyIdx == i)
			continue;
		
		proxylist[i].group.setVisible(false);

		if(proxylist[i].annoClass == 'SpaceProxy' ){
			proxylist[i].shape.setVisible(false);	

		}else if(proxylist[i].annoClass == 'PolyProxy' ){
			proxylist[i].polyShape.setVisible(false);

		}else if(proxylist[i].annoClass == 'BoxProxy' ){
			proxylist[i].topFace.shape.setVisible(false);
			proxylist[i].bottomFace.shape.setVisible(false);
		}
		
	}
	
}

function showAllProxy( proxylist, machine  , opts ){

	 
	
	for( var i=0 ; i < proxylist.length ; i++){
		
		if( opts.skipCurrent && machine.currentProxyIdx == i)
			continue;
		
		proxylist[i].group.setVisible(true);	
		
		if(proxylist[i].annoClass == 'SpaceProxy' ){
			proxylist[i].shape.setVisible(true);	
		
		}else if(proxylist[i].annoClass == 'PolyProxy' ){
			proxylist[i].polyShape.setVisible(true);

		}else if(proxylist[i].annoClass == 'BoxProxy' ){
			proxylist[i].topFace.shape.setVisible(true);
			proxylist[i].bottomFace.shape.setVisible(true);
		}
				
	}

}
		   
function sendResult(){
	
	var serverURL = './saveres.php';
	var data = new Object();
	data.front= box1Pts.front_polygon.slice(0);;
	data.back= box1Pts.back_polygon.slice(0);;
	
	
	for(var ip in data.back){
		delete data.back[ip].archor;
	}
	for(var ip in data.front){
		delete data.front[ip].archor;
	}
	 var str =JSON.stringify(data);
	
	$.post(serverURL, { json_string:str }
		,function(data){
			console.log(data);	
		}
	).success(function() { 
		alert("second success"); 
		window.location='./result/';
	}).error(function() { alert("error"); });//.complete(function() { alert("complete"); });
	 
	 
}

function checkImage(src) {
  var img = new Image();
  img.onerror = function() {
	 alert('IMAGE URL error!  call window.stop() ');
	 window.stop();
  };
  img.src = src; // fires off loading of image
  return img;
}
function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}
 
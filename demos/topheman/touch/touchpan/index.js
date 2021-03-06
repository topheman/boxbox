(function(){

function init(){
    
    initViewport();
    
    //init canvas and world
    canvas = document.getElementById("canvas");
    logging = SoftLogger.getInstance({fitToCanvas: canvas});
    
//    var borders = {
//        left : -2,
//        right : 45,
//        top : -2,
//        bottom : 40
//    };
    
    var borders = {
        left : 2,
        right : 30,
        top : 2,
        bottom : 25
    };
    
    var boundaries = {};
    boundaries.left = borders.left;
    boundaries.right = borders.right;
    boundaries.top = borders.top;
    boundaries.bottom = borders.bottom;
    
    centerOfBorders = {
        x : (borders.right - borders.left) /2 + borders.left,
        y : (borders.bottom - borders.top) /2 + borders.top
    };
    
    myWorld = boxbox.createWorld(canvas,{
        scale:30, 
        preventScroll:true, 
        disableTouchEvents : false,
        disableKeyEvents : true, 
        disableMouseEvents : true, 
        debugDraw:false,
        boundaries : boundaries
    });
    
    myWorld.onRender(function(){
        logging.draw(this._ctx);
    });
    
    //create entities
    left = myWorld.createEntity({
      color: "orange",
      x: 4,
      y: 2,
      width: 5,
      height: 6
    });
    left.name('left');

    right = myWorld.createEntity({
        x: 20,
        y: 0,
      width: 5,
      height: 6
    });
    right.name('right');
    
    center = myWorld.createEntity({
        color : 'red',
        x: 12,
        y: 0,
        width: 5,
        density: 10,
        height: 7
    });
    center.name('center');

    ground = myWorld.createEntity({
      color: "green",
      x: 15,
      y: 14,
      width: 30,
      height: 0.5,
      type: "static"
    });
    ground.name('ground');
    
    wallLeft = myWorld.createEntity({
      color: "blue",
      x: borders.left,
      y: 16,
      width: 1,
      height: 16,
      type: "static",
      active: false
    });
    wallLeft.name('wallLeft');
    
    wallRight = myWorld.createEntity({
      color: "blue",
      x: borders.right,
      y: 16,
      width: 1,
      height: 16,
      type: "static",
      active: false
    });
    wallRight.name('wallRight');
    
    wallTop = myWorld.createEntity({
      color: "blue",
      x: 18,
      y: borders.top,
      width: 16,
      height: 1,
      type: "static",
      active: false
    });
    wallRight.name('wallTop');
    
    wallBottom = myWorld.createEntity({
      color: "blue",
      x: 18,
      y: borders.bottom,
      width: 16,
      height: 1,
      type: "static",
      active: false
    });
    wallBottom.name('wallBottom');
    
    point = myWorld.createEntity({
        shape : 'circle',
        radius : 1,
        color : 'black',
        x: centerOfBorders.x,
        y: centerOfBorders.y,
        width: 5,
        density: 10,
        height: 7,
        type: "static",
        active: false
    });
    point.name('point');
    
    center.touchDraggable({
        start : function(e, touchDraggableInfos){
            console.info('red start callback',e, touchDraggableInfos);
            console.log('red start');
        },
        drag : function(e, touchDraggableInfos){
//            console.info('red drag callback',e, touchDraggableInfos);
            console.log('red drag');
        },
        stop : function(e, touchDraggableInfos){
            console.info('red stop callback',e, touchDraggableInfos);
            console.log('red stop');
        },
        touchadd : function(e, touchDraggableInfos,touchesCount){
            console.info('red touchadd callback',e, touchDraggableInfos,touchesCount);
            console.log('red touchadd');
        },
        touchremove : function(e, touchDraggableInfos,touchesCount){
            console.info('red touchremove callback',e, touchDraggableInfos,touchesCount);
            console.log('red touchremove');
        }
    });
    left.touchDraggable({
        type: 'eventDrag',
        start : function(e, touchDraggableInfos){
            console.info('yellow eventdrag start callback',e,touchDraggableInfos);
            console.log('yellow eventdrag start');
        },
        drag : function(e, touchDraggableInfos){
//            console.info('yellow eventdrag drag callback',e, touchDraggableInfos);
            console.log('yellow eventdrag drag');
        },
        stop : function(e, touchDraggableInfos){
            console.info('yellow eventdrag stop callback',e, touchDraggableInfos);
            console.log('yellow eventdrag stop');
        },
        touchadd : function(e, touchDraggableInfos,touchesCount){
            console.info('yellow eventdrag touchadd callback',e,touchDraggableInfos,touchesCount);
            console.log('yellow eventdrag touchadd');
        },
        touchremove : function(e, touchDraggableInfos,touchesCount){
            console.info('yellow eventdrag touchremove callback',e,touchDraggableInfos,touchesCount);
            console.log('yellow eventdrag touchremove');
        }
    });
    right.touchDraggable({
        start : function(e, touchDraggableInfos){
            console.info('gray start callback',e, touchDraggableInfos);
            console.log('gray start');
        },
        drag : function(e, touchDraggableInfos){
//            console.info('gray drag callback',e, touchDraggableInfos);
            console.log('gray drag');
        },
        stop : function(e, touchDraggableInfos){
            console.info('gray stop callback',e, touchDraggableInfos);
            console.log('gray stop');
        },
        touchadd : function(e, touchDraggableInfos,touchesCount){
            console.info('gray touchadd callback',e, touchDraggableInfos,touchesCount);
            console.log('gray touchadd');
        },
        touchremove : function(e, touchDraggableInfos,touchesCount){
            console.info('gray touchremove callback',e, touchDraggableInfos,touchesCount);
            console.log('gray touchremove');
        }
    });
    
    myWorld.touchPan({
        allowPinch : true,
        start: function(e, viewportInfos){
            point.color('pink');
            console.info('touchPan start',e,viewportInfos);
            console.log('touchPan start');
        },
        drag: function(e, viewportInfos){
            console.info('touchPan drag',e, viewportInfos);
            console.log('touchPan drag');
        },
        stop: function(e, viewportInfos){
            point.color('black');
            console.info('touchPan stop',e,viewportInfos);
            console.log('touchPan stop');
        },
        startPinching: function(e, viewportInfos){
            point.color('red');
            console.info('touchPan startPinching',e,viewportInfos);
            console.log('touchPan startPinching');
        },
        stopPinching: function(e, viewportInfos){
            point.color('pink');
            console.info('touchPan stopPinching',e,viewportInfos);
            console.log('touchPan stopPinching');
        }
    });
}   

init();

})();
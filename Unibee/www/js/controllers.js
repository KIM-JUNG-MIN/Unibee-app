angular.module('app.controllers', [])

.controller('unibeeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('dashboardCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('beeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
  var socket = io.connect("http://192.168.43.198:9000");
  var bee_room = 'SJeGqTx3';
  paths = {};
  var thick = 3;
  var color = '#000';
  var currentUser = 'ctl_anna17';
  init();

  function init(){
    paper.install(window);
    paper.setup('MyCanvas'); // your canvas html id
  }

  $scope.downEvent = function(event){
    event.point = getPoint(event);

    var startObject = {
      x: event.point.x,
      y: event.point.y,
      color: color,
      thick: thick
    };

    startPath(startObject, currentUser);
    //socket.emit('startPath', startObject, currentUser, bee_room);
  }

  $scope.dragEvent = function(event){

    event.point = getPoint(event);

    var continueObject = {
      x: event.point.x,
      y: event.point.y
    };

    continuePath(continueObject, currentUser);
    //socket.emit('continuePath', continueObject, currentUser, bee_room);
  }

  $scope.upEvent = function(event){
    event.point = getPoint(event);

    var endObject = {
      x: event.point.x,
      y: event.point.y
    };

    var path = paths[currentUser];

  	if (path) {
  		path.add(new paper.Point(data.x, data.y));
  		path.smooth();

      delete paths[currentUser];
      //socket.emit('endPath', endObject, path, currentUser, bee_room);
  	}

  }

  function startPath(data, currentUser) {

    paths[currentUser] = new paper.Path({
  	  	strokeColor: data.color,
  			strokeWidth: data.thick
  	  }
  	);

  	currentPathName = currentUser + ':path:' + paths[currentUser].id;
  	paths[currentUser].name = currentPathName;
  	paths[currentUser].add(new paper.Point(data.x, data.y));

  }

  function continuePath(data, currentUser) {

  	var path = paths[currentUser];

  	if (path) {
  		path.add(new paper.Point(data.x, data.y));
  		path.smooth();
  	}

  }

  function endPath(data, currentUser) {

    var path = paths[currentUser];

  	if (path) {
  		path.add(new paper.Point(data.x, data.y));
  		path.smooth();

      delete paths[currentUser];
  	}

  }

  function getPoint(event) {
    try { // on android
      return new Point(event.gesture.center.pageX, event.gesture.center.pageY - 44)
          // 44 = header bar pixel height
    }
    catch (e) { // on ionic serve, brower
      return new Point(event.x, event.y - 44);
    }
  }

  socket.emit('joinBee', {room:bee_room});

  socket.on('loading:start', function() {
    console.log('loading:start');
  });

  socket.on('project:load', function(json) {
    console.log("project:load");
    paper.project.activeLayer.remove();
    paper.project.importJSON(json.project);

    paper.view.draw();

  });

  socket.on('project:load:error', function() {
    console.log('project:load:error');
  });


  socket.on('loading:end', function() {
    console.log('loading:end');
  });

  socket.on('startPath', function(data, user){
  	 startPath(data, user);
  });

  socket.on('continuePath', function(data, user) {
  		continuePath(data, user);
  		paper.view.draw();
  });

  socket.on('endPath', function(data, user) {
  		endPath(data, user);
  		paper.view.draw();
  });

}])

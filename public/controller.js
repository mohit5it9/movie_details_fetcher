angular.module('IMDBApp', [])
.controller('IMDBController',['$scope','$http',function($scope,$http){
	console.log('Hello From IMDBController');
	this.movieId = 197;
	this.sendId = function(id){
		console.log("Id Sent",id);
		$http({method: 'POST',url: '/test',headers:{'Content-Type': 'text/plain'},data: id})
			.success(function(response){
				console.log("response is ",response);
				$scope.test =  response;
			});
	};
}]);
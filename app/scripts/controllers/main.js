app.controller('MainCtrl', ["$scope", "$http", "$q",

	function ($scope, $http, $q) {
		
		//init
		$scope.type = "";
		$scope.data = {};
		$scope.viewType = 'list';

		 //dummy produce data for time being
	    $scope.produce = [
	    {
	    	type: "mango",
	    	suburb: "Rooty Hill",
	    	postcode: "2000",
	    	price: "4.34",
	    	quantity: 3
		},
		{
	    	type: "apple",
	    	suburb: "Rooty Hill",
	    	postcode: "2000",
	    	price: "4.34",
	    	quantity: 20
		},
		{
	    	type: "strawberry",
	    	suburb: "Wahroonga",
	    	postcode: "2076",
	    	price: "54.34",
	    	quantity: 5
		}
		];

		$scope.produceImage = {
			apple: "images/apple.png",
			avocado: "images/avocado.png",
			banana: "images/banana.png",
			basil: "images/basil.png",
			carrot: "images/carrot.png",
			mango: "images/mango.png",
			strawberry: "images/strawberry.png",
			tomato: "images/tomato.png",

		};

		//connect produce, image and distance
		angular.forEach($scope.produce, function(value, key) {

			
			var type = '';
			var location = '';
		 	angular.forEach(value, function(value, key) {
		 	  //find the product type
			  if(key === 'type')
			  {
			  	type = value;
			  }
			  //find the suburb
			  if(key === 'suburb')
			  {
			  	location = value;
			  }
			});
			
		 	//match to the corresponding image
		 	value.img = $scope.produceImage[type];

		 	var lat = getLatLng(location)[0];
		 	var lng = getLatLng(location)[1];
		 	value.distance = getDistance(lat, lng);
		 	console.log(lat, lng);
		 	console.log(getDistance(lat, lng));
		});

		///LOGIN needs URL
		$scope.login = function()
		{
			if($scope.data.email && $scope.data.password)
			{
				$scope.submit(url, $scope.data);
			}
		};
	   
		////SUBMIT FUNCTION -- general
		$scope.submit = function (url, data)
	    {
	        // return a promise to handle ansynchronous callbacks via .then()
	        var deferred = $q.defer();

	        $http(
	            {
	                url: url,
	                method: "POST",
	                data: data,
	                headers:
	                {
	                    'Content-Type': 'application/json'
	                }
	            })
	            .success(function (result)
	            {
	                if ((result.status && result.status === "error") || (result.error && result.error.errorURL) || (result.errors && result.errors.length))
	                {
	                    // server result reported error
	                    deferred.reject(result);

	                }
	                else
	                {
	                    // trigger .then() in caller
	                    deferred.resolve(result);
	                }
	            })
	            .error(function ()
	            {
	                var result = {};

	                result.errors = [
	                {
	                    "message": "Error retrieving data",
	                    "cause": "Server error"
	                }];

	                deferred.reject(result);
	            });

	        return deferred.promise;
	    };





	    
  }]);
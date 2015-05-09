app.controller('MainCtrl', ["$scope", "$http", "$q", "$location",

	function ($scope, $http, $q, $location) {
		
		//init
		$scope.type = "";
		$scope.data = {};
		$scope.viewType = 'list';
		$scope.addnew = {};

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

		if(window.location.hash.indexOf('+'))
		{
			var hash = window.location.hash.replace('#/', '').split('+');

			if(hash.length > 1)
			{
				$scope.produce.push({
			    	type: hash[0],
			    	suburb: hash[1],
			    	postcode: hash[2],
			    	price: hash[3],
			    	quantity: hash[4]
				});
			}
		}

		$scope.produceImage = {
			apple: "images/apple.png",
			avocado: "images/avocado.png",
			banana: "images/banana.png",
			basil: "images/basil.png",
			carrot: "images/carrot.png",
			mango: "images/mango.png",
			orange: "images/orange.png",
			lemon: "images/lemon.png",
			strawberry: "images/strawberry.png",
			tomato: "images/tomato.png",

		};

		//connect produce, image and distance
		angular.forEach($scope.produce, function(value, key) {
			console.log(value, key);
			
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
		});

		$scope.getHash = function()
		{
			return window.location.hash.replace('#/', '');
		}

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
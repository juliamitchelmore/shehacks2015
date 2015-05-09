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
	    	suburb: "marrickville",
	    	postcode: "2204",
	    	price: "0.15",
	    	quantity: 20
		},
		{
	    	type: "apple",
	    	suburb: "marrickville",
	    	postcode: "2204",
	    	price: "0.10",
	    	quantity: 20
		},
		{
	    	type: "strawberry",
	    	suburb: "marrickville",
	    	postcode: "2204",
	    	price: "0.00",
	    	quantity: 50
		},
	    {
	        type: "avocado",
	        suburb: "marrickville",
	        postcode: "2204",
	        price: "0.20",
	        quantity: 15
	    }
        ,
		{
		    type: "lemon",
		    suburb: "marrickville",
		    postcode: "2204",
		    price: "0.05",
		    quantity: 50
		},
        {
            type: "banana",
            suburb: "marrickville",
            postcode: "2204",
        	price: "0.10",
        	quantity: 15
        },
        {
            type: "orange",
            suburb: "marrickville",
            postcode: "2204",
        	price: "0.10",
        	quantity: 25
        },
        {
            type: "tomato",
            suburb: "marrickville",
            postcode: "2204",
            price: "0.05",
            quantity: 20
        },
        {
            type: "mango",
            suburb: "Newtown",
            postcode: "2042",
            price: "0.10",
            quantity: 15
        },
		{
		    type: "apple",
		    suburb: "Newtown",
		    postcode: "2042",
		    price: "0.12",
		    quantity: 25
		},
		{
		    type: "strawberry",
		    suburb: "Newtown",
		    postcode: "2042",
		    price: "0.07",
		    quantity: 30
		},
	    {
	        type: "avocado",
	        suburb: "Newtown",
	        postcode: "2042",
	        price: "0.15",
	        quantity: 15
	    }
        ,
		{
		    type: "lemon",
		    suburb: "Newtown",
		    postcode: "2042",
		    price: "0.00",
		    quantity: 50
		},
        {
            type: "banana",
            suburb: "Newtown",
            postcode: "2042",
            price: "0.10",
            quantity: 15
        },
        {
            type: "orange",
            suburb: "Newtown",
            postcode: "2042",
            price: "0.20",
            quantity: 15
        },
        {
            type: "tomato",
            suburb: "Newtown",
            postcode: "2042",
            price: "0.10",
            quantity: 18
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
			orange: "images/orange.png",
			carrot: "images/carrot.png",
			mango: "images/mango.png",
			orange: "images/orange.png",
			lemon: "images/lemon.png",
			strawberry: "images/strawberry.png",
			tomato: "images/tomato.png",

		};

		$scope.producePrice = {
		    apple: 0.10,
		    avocado: 0.20,
		    banana: 0.10,
		    orange: 0.10,
		    lemon: 0.05,
		    mango: 0.15,
		    strawberry: 0.05,
		    tomato: 0.10,

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
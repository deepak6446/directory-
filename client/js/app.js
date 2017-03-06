angular
	.module("catApp",["lbServices","ngRoute","ngStorage"])
	.controller("catController",catController)
    .config(function ($routeProvider,$locationProvider){
                $routeProvider
                  .when("/",{
                      templateUrl:"./signup.html"
                  })
                  .when("/form/:name",{
                      templateUrl:"signup.html"
                  })
                  .when("/home",{
                      templateUrl:"home.html"
                  })
                  .otherwise({
                      redirectTo: "/"
                  })
                  $locationProvider.html5Mode(true);

       });
	function catController($scope,$http,Cat,$localStorage,$location,Login){
		$scope.showsubcat=showsubcat;
		function init(){
			$scope.cats=Cat.find();
			/*console.log($scope.cats);*/
			$scope.email=$localStorage.email;
			/*console.log($localStorage.email);*/
			$scope.showaddcat=false;
			$scope.showedit=false;
			$scope.showaddnewcat=false;
			$scope.login=true;
 			$scope.user=$localStorage.user;
			/*console.log($localStorage.login);*/
			if($localStorage.login == 1){
              $scope.loginshow = false;
              $scope.login=false;
              $location.url('/home');
              /*console.log('$scope.loginshow = false');*/
            }    
            else{
              $scope.loginshow = true;
              console.log('$scope.loginshow = true');
            }
            $scope.user = $localStorage.user;
		}
		init();
		function showhidelogin(){
			$scope.login=!$scope.login;
		}	
		$scope.logout=function(){
          $localStorage.$reset();
          console.log($localStorage);
          $localStorage.login=0;
          $scope.email='';
          $scope.login = true;
          $location.url('/');
          $scope.alertshow=false;
        }
		$scope.signup=function(scopedata){
			console.log(scopedata.email);
			console.log(scopedata);
			Login.create({email: scopedata.email,firstname: scopedata.firstName,lastname: scopedata.lastame,password: scopedata.password }).$promise
 			 .then(function(login) {
 			 		console.log(login);
 			 		showhidelogin();
 			 		//$scope.login=false;
 			 		$localStorage.user=login.firstname;
 			 		$localStorage.email=login.email;
 			 		$scope.email=$localStorage.email;
 			 		console.log("signup login",$localStorage.email);
 			 		$scope.user=$localStorage.user;
 			 		$localStorage.login=1;
 			 		$location.url('/home');
 			  });;

		}
		$scope.loginaccount=function(email,password){
			console.log("data",email,password);
			Login.findOne({ 
			  filter: {
			    where: {
			      email:email
			    }
			  }
			}).$promise
			     .then(function(data){
			     	console.log("emai:",data.email);
			     	console.log("password:",data.password);

			     	if(data.password==password){
			     		showhidelogin();
			     	    $localStorage.user=data.firstname;
	 			 		$scope.user=$localStorage.user;
	 			 		$localStorage.login=1;
	 			 		$location.url('/home');
	 			 		$localStorage.email=data.email;
	 			 		$scope.email=$localStorage.email;
 			 			console.log("signup login",$localStorage.email);
			     	}
			     	else{
			     		//alert("invalid email or password or both");
			     		$scope.alertshow=true;
			     	}
			     	
			     },function(error){
			     	console.log(error);	
			     	$scope.alertshow=true;
			     });     
			
		}
		$scope.addsubcategory=function(){
			console.log(this.cat.name);	
			$scope.parentCat=this.cat.name;
			$scope.showaddcat=true;
		}
		$scope.addnewcat=function(newCat){
			Cat.create({name: newCat,patent:"menu",email:$localStorage.email}).$promise
 			 .then(function(cat) { 
 			 		$scope.cats.push(cat);
 		            console.log("cats",cat);
 		            $scope.showaddnewcat=false;
 			  });
		}
		$scope.addsubcat=function(subCat){
			console.log(subCat);
			console.log($scope.parentCat);
			console.log($localStorage.email);
			Cat.create({name: subCat,patent:$scope.parentCat,email:$localStorage.email}).$promise
 			 .then(function(cat) { 
 			 		$scope.cats.push(cat);
 		            console.log("cats",cat);
 			  });;
			$scope.showaddcat=false;
		}
		$scope.initsubcat=function(){
			this.subcat=false;
			console.log("init");
		}
		function showsubcat(){
			console.log(" in showsubcat");
			this.subcat=!this.subcat;
		} 
	}
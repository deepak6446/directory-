
   angular
       .module('MyApp', ["ngRoute","ngStorage",'lbServices'])
       .controller('subCtrl',subCtrl)
       .controller('MainCtrl',mainctrl)
       .controller("homepagecont",homepagecont)
       .controller("bodycontroller",bodycontroller)
       .controller("loginController",loginController)
       .config(function ($routeProvider,$locationProvider){
                $routeProvider
                  .when("/",{
                      templateUrl:"./index1.html",
                      controller:"MainCtrl"

                  })
                  .when("/offers",{
                      templateUrl:"./amazonhome2.html",
                      controller: "homepagecont"
                  })
                  .when("/search",{
                      templateUrl:"./search.html"
                  })
                  .when("/form/:name",{
                      templateUrl:"signup.html",
                      controller:"loginController"
                  })
                  .otherwise({
                      redirectTo: "/"
                  })

                  $locationProvider.html5Mode(true);

       });

  function bodycontroller($scope,$http,$localStorage){
        

        function init(){
          if($localStorage.login == 1)
          {
            $scope.login = false;
          }    
          else
          {
            $scope.login = true;
          }
          $scope.user = $localStorage.user;
        }
        init();
        $scope.showlogin=showlogin;
        $scope.callcli=callcli;
        $scope.searchoffers=searchoffers;
        $scope.logout=logout;

        function logout(){
          $localStorage.$reset();
          console.log($localStorage);
          $scope.login = true;
        }

        function showlogin(data){
          $scope.login = !$scope.login;
          $localStorage.user=JSON.stringify(data);
          $scope.user=$localStorage.user;   
          $localStorage.login = 1;        
          console.log("in showlogin");

        } 
        function callcli(data){
          //console.log("in callcli", data);
          $scope.cli=data;
        } 
        function searchoffers(text){
            $http
                .get("/api/getsearchoffers/"+text)
                .then(function(res){
                    $scope.offers=res.data;
                    if(res.data.length == 0){
                      $scope.search = true;
                      console.log("asdasd");
                    }
                    else{
                      $scope.search = false ;
                    }
                })
                .catch(function(res){
                  console.error('searchoffers error',res.status,res.data);
                });

          //console.log("in searchoffers",text);
        } 
       
  }
  
  function loginController($scope,$http,$location){

      function init(){

            if($location.path() == '/form/login'){
                loginshow=true;
                console.log("in login");
            }
            else{
              loginshow=false;
              console.log("in signupgn")
            }
            alertshow='false';
       }
       init();
    $scope.login=login;
    $scope.signin=signin;
    $scope.signup=signup;
    $scope.loginshow=loginshow;
    $scope.loginaccount=loginaccount;
    $scope.fortgetpassword=fortgetpassword;

    function fortgetpassword(scopedata){
      $http
          .get("/api/forgetpass/"+scopedata.email)
          .then(function(response){
            if(response.status == 200)
            {
              alert("Password send to your registered email address");
            }
            else
            {
              alert("Email address not registered Try Signup");
            }
          },function(error){
            alert("error");
          }
          );

    }  
    function loginaccount(scopeemail){
      //console.log("befor loginaccount : ",scopeemail);
      $http
        .get("/apt/loginaccount/"+scopeemail)
        .then(function (sc1ope) {
            //console.log("add : ",sc1ope);
            //console.log("sc1ope.data.email : ",sc1ope.data.email,sc1ope.data.password);

                    if($scope.scopedata.email == sc1ope.data.email && $scope.scopedata.password == sc1ope.data.password)
                    {
                      $scope.$parent.user=sc1ope.data.firstName;
                      $scope.$parent.showlogin(sc1ope.data.firstName);
                      $location.url('/');
                    }
                    else
                    {
                      $scope.alertshow = true;
                    }

        }, function(sc1ope) {
            //some error
            alert("Error login");
            //console.log("error",sc1ope);
        });        
       
    }

    function signin(){
      //console.log("in signin function");
      $scope.loginshow=true;  
      $scope.forgetpass=false;
    }
    function login(){
      //console.log("in login function");
      $scope.loginshow=false; 
    }
    function signup(scopedata){
      $http.post("/api/signUpPage",scopedata)
      .then(function (sc1ope) {
            //console.log("in sign up index.js",sc1ope.status);
            var add=sc1ope.status;
            if (add == 200)
            {
              sc1ope.data.firstName="";
              $scope.$parent.showlogin(sc1ope.data.firstName);
              $location.url('/');
            }
            //console.log("in sign up index.js",add);
              
        }, function(sc1ope) {
            //some error
            alert("Error signup try again");
            //console.log("error",sc1ope);
        });     
      //console.log("in signup function");
      //console.log(scopedata);
    }
  }


  function homepagecont($scope,$http){

      $scope.getAllOffers=getAllOffers;
     
      function getAllOffers(){
      //console.log("clidata",$scope.$parent.cli);
          
        $http 
            .get("/api/getclientoffers/"+$scope.$parent.cli)
            .then(function(response) {
              $scope.clients = response.data;
            })
            .catch(function(response) {
            //console.error('Gists error', response.status, response.data);
          });
          
      }  
       }     

 function mainctrl($scope,$http,$interval) {
        
        $scope.index = 0;
        $scope.todayoffers=todayoffers;
        $scope.indexcheck=indexcheck;

        function makeindexfalse(){
             $scope.in0 = false;
             $scope.in1 = false;
             $scope.in2 = false;
             $scope.in3 = false;
             $scope.in4 = false;
        }
        $interval(function () {

            if($scope.index >= 4)
            {
                makeindexfalse();
                $scope.index=0;
                $scope.in0 = true;
            }
            else
            {
                $scope.index=$scope.index+1 ;
                indexcheck();
                
            }
        }, 2000);

        function indexcheck(){
                makeindexfalse();
                if($scope.index==0)
                {
                   $scope.in0 = true;     
                }
                else if($scope.index==1)
                {
                   $scope.in1 = true;     
                }
                else if($scope.index==2)
                {
                   $scope.in2 = true;     
                }
                else if($scope.index==3)
                {
                   $scope.in3 = true;     
                }
                else if($scope.index==4)
                {
                   $scope.in4 = true;     
                }

        }
        function todayoffers(){
          console.log("in todayoffers");
            
            $http
                .get("/api/gettodayoffers")
                .then(function(response){
                    $scope.offers=response.data;
                  })
                .catch(function(response){
                    console.log("error in todayoffers");           
                 });
        }

 }
  function subCtrl($scope,$http){
    $scope.subscribe=subscribe;

      function subscribe(scopesub){
          //console.log("in subscribe",scopesub.email);
          $http
              .post("/api/subemail",scopesub)
              .then(function(response){
                    alert("subscription successful");
                  })
                .catch(function(response){
                    alert("subscription not successful");          
                 });
              

      }



  }     

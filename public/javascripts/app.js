angular.module('student', [])
 .controller('mainCtrl', [
 '$scope','$http','$compile',
 function($scope, $http, $compile) {
   $scope.students = [];

   $scope.create = function(student) {
     return $http.post('/students', student).success(function (data){
      $scope.students.push(data);
     });
   };

   $scope.delete = function(student) {
     $http.delete('/students/' + student._id)
       .success(function(data){
        console.log("Delete worked");
     });
     $scope.getAll();
   };

   $scope.addStudent = function(){
     if($scope.studentNameForm ==='') { return;}
     console.log("In addStudent with " +$scope.studentNameForm);
     $scope.create({ 
       name: $scope.studentNameForm,
       practiceTime: 0
     });
     $scope.studentNameForm ='';
   };

   
   $scope.incrementPracticeTime = function(student) {
     console.log("inside Increment practice time with " + student.name)
     $scope.addPracticeTime(student);
     //student.addPracticeTime(formContent) //Need to get the time from a form
     //Maybe we could have a button for each student that is like (+5) or (+10) mins 
   };

   $scope.addPracticeTime = function(student) {
     return $http.put('/students/' + student._id + '/practice')
       .success(function(data) {
          console.log('addPracticeTime worked');
         // student.practiceTime +=1;
       });
   };

   $scope.getAll = function() {
     return $http.get('/students').success(function(data){
       angular.copy(data, $scope.students);
     });
   };
   
   /*
   $scope.addButton = function(student){
     var btnhtml = '<button type="submit" ng-click="buttonTest()">Add Practice time </button>';
     var temp = $compile(btnhtml)($scope);
     angular.element(document.getElementById(student._id)).append(temp);
   }   
   */ 

   $scope.buttonTest = function(student) {
     console.log("Button has clicked");
   }

   $scope.getAll();
 }
])//End of controller

.directive('profile', function($compile) {
  return {
    scope: {
     student: '=',
    },   
    restrict: 'E',
    replace: 'true',
    template: (
        '<div id = "{{student._id}}"  class="profile info">' +
          '<h4>{{student.name}}</h4>'+
          '<h4>Practice Time: {{student.practiceTime}}</h4>' +
        '</div>'      
    ),
    link : function(scope, element, attrs) {
      var newEl = angular.element('<button type="submit" btn="buttonTest">Add Practice Time</button>');
      var temp = $compile(newEl)(scope);
   // console.log(scope);
      console.log(element);
   // console.log(attrs);
      
      element.append(temp);
   // $compile(newEl)(scope);
    }
  }
})

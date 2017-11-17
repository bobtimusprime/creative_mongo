angular.module('student', [])
 .directive('profile', profileDirective)
 .controller('mainCtrl', [
 '$scope','$http',
 function($scope, $http) {
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

   $scope.getAll();
 }
])//End of controller

function profileDirective() {
  return {
    scope: {
      student: '='
    },
    restrict: 'E',
    replace: 'true',
    template: (
      '<div class="Profile">' +
        '<h4>{{student.name}}</h4>' +
        '<h4>Practice Time: {{student.practiceTime}}</h4>' +
        '<span class="glyphicon glyphicon-thumbs-up" ng-click="incrementPracticeTime(student)"></span>' +
        '<span class="glyphicon glyphicon-remove" ng-click="delete(student)"></span>' +
      '</div>'
    ),
    link: link
  };

  function link (scope) {
    //if (!scope.user.picUrl) {
    //  scope.user.avatarUrl = 'https://www.drupal.org/files/issues/default-avatar.png';
    //}
  }
  
}

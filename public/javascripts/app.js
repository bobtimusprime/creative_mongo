angular.module('student', [])
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
     if($scope.formContent ==='') { return;}
     console.log("In addStudent with " +$scope.formContent);
     $scope.create({ 
       name: $scope.formContent,
       practiceTime: 0
     });
     $scope.formContent ='';
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
]);

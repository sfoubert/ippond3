'use strict';

/**
 * @ngdoc function
 * @name ippond3App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ippond3App
 */
angular.module('ippond3App')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.generateRandom = function() {
        return Math.floor((Math.random() * 10) + 1);
    };

    $scope.loadGraphDatas = function() {
        // Charts datas
        $scope.barDatas = [
            {'status': 'Non initialisees', 'nb': $scope.generateRandom(), color: '#CF112D'},
            {'status': 'En cours', 'nb': $scope.generateRandom(), color: '#FF9900'},
            {'status': 'Conformes', 'nb': $scope.generateRandom(), color: '#BFD730'}
        ];
    };

    $scope.loadGraphDatas();

  });

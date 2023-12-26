(function() {
    'use strict';

    let angular;
    angular.module('LunchCheck', [])
        .controller('LunchCheckController', ['$scope', function($scope) {
            $scope.items = '';
            $scope.message = '';

            $scope.checkItems = function() {
                const itemArray = $scope.items.trim().split(',');
                const nonEmptyItems = itemArray.filter(item => item.trim());
                const itemCount = nonEmptyItems.length;

                $scope.message = itemCount > 4 ? 'Too many items!' : 'Just right!';
            };
        }]);
})();

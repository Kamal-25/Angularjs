(function () {
    'use strict';

    let angular;
    angular.module('MenuApp')
        .component('categories', {
            templateUrl: 'categories.template.html',
            bindings: {
                categories: '<'
            }
        });

})();

(function () {
    angular.module('restaurantApp', ['ngRoute']);

    angular.module('restaurantApp').config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/myInfo', {
                templateUrl: 'myInfo.html',
                controller: 'MyInfoController as myInfoCtrl'
            })
            .when('/signUp', {
                templateUrl: 'signUp.html',
                controller: 'SignUpController as signUpCtrl'
            })
            .otherwise({
                redirectTo: '/myInfo'
            });
    }]);

    angular.module('restaurantApp').controller('MainController', ['$location', function ($location) {
        var vm = this;

        vm.navigateTo = function (path) {
            $location.path('/' + path);
        };
    }]);

    angular.module('restaurantApp').controller('MyInfoController', ['UserService', function (UserService) {
        var vm = this;

        vm.user = UserService.getUser();

        if (!vm.user) {
            vm.message = 'Not Signed Up Yet. ';
            vm.signUpLink = 'Sign up Now!';
        }
    }]);

    angular.module('restaurantApp').controller('SignUpController', ['$http', 'UserService', function ($http, UserService) {
        var vm = this;

        vm.submitForm = function () {
            // AngularJS validation

            // Simulate menu item existence check (replace with actual HTTP request)
            var menuNumber = vm.menuNumber;
            var menuUrl = `https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/${menuNumber}.json`;

            $http.get(menuUrl)
                .then(function (response) {
                    var menuItem = response.data;

                    if (menuItem) {
                        // Save user's preference
                        UserService.saveUser({
                            firstName: vm.firstName,
                            lastName: vm.lastName,
                            email: vm.email,
                            phoneNumber: vm.phoneNumber,
                            favoriteMenuItem: menuItem
                        });

                        vm.message = 'Your information has been saved.';
                    } else {
                        vm.errorMessage = 'No such menu number exists.';
                    }
                })
                .catch(function (error) {
                    console.error('Error checking menu item:', error);
                });
        };
    }]);

    angular.module('restaurantApp').service('UserService', function () {
        var user;

        this.saveUser = function (userData) {
            user = userData;
        };

        this.getUser = function () {
            return user;
        };
    });
})();

(function() {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .service('ShoppingListCheckOffService', function() {
            this.items = ['Milk', 'Bread', 'Eggs']; // Initial to-buy items
            this.boughtItems = [];

            this.buyItem = function(item) {
                const index = this.items.indexOf(item);
                this.items.splice(index, 1);
                this.boughtItems.push(item);
            };
        })
        .controller('ToBuyController', ['ShoppingListCheckOffService', function(ShoppingListCheckOffService) {
            this.items = ShoppingListCheckOffService.items;
        }])
        .controller('AlreadyBoughtController', ['ShoppingListCheckOffService', function(ShoppingListCheckOffService) {
            this.boughtItems = ShoppingListCheckOffService.boughtItems;
        }]);
})();

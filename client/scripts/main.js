'use strict';

var namespace = 'main';

var angular = require('angular');

var app = angular.module(namespace, [
    // inject:modules start

    require('./common')(namespace).name

    // inject:modules end
]);

module.exports = app;
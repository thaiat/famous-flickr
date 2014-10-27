'use strict';
var servicename = 'photos';
var _ = require('lodash');
var randomstring = require('randomstring');
module.exports = function(app) {

    var dependencies = [];

    function service() {
        var generate = function(width, height, number, groupOf) {
            number = number || 1;
            groupOf = groupOf || 1;
            var photos = _.chain(_.range(number))
                .map(function(index) {
                    return 'http://lorempixel.com/' + Math.round(width) + '/' + Math.round(height) + '/?i=' + randomstring.generate(7);
                })
                .groupBy(function(value, i) {
                    return Math.floor(i / groupOf);
                })
                .value();

            return photos;
        };

        var getStyle = function(photoUrl) {
            return {
                'background-image': 'url(\'' + photoUrl + '\')',
                'background-size': 'cover',
                'background-repeat': 'no-repeat',
                'background-position': 'center',
                'width': '100%',
                'height': '100%'
            };
        };

        return {
            generate: generate,
            getStyle: getStyle
        };
    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
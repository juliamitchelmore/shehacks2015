'use strict';

/**
 * @ngdoc overview
 * @name shehacks2015App
 * @description
 * # shehacks2015App
 *
 * Main module of the application.
 */
var app = angular.module('shehacks2015App', []);

app.filter('titlecase', function() {
    return function(s) {
        s = ( s === undefined || s === null ) ? '' : s;
        return s.toString().toLowerCase().replace( /\b([a-z])/g, function(ch) {
            return ch.toUpperCase();
        });
    };
});
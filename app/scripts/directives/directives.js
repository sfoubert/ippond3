/*global d3:false */

'use strict';

/**
 * @ngdoc directive
 * @name ippond3App.directive:directives
 * @description
 * # directives
 */
angular.module('ippond3App')
    .directive('directives', function() {
        return {
            template: '<div></div>',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                element.text('this is the directives directive');
            }
        };
    })


// Directives contenant le code D3.js
.directive('barChart', function($window) {
    return {
        restrict: 'A',
        link: function(scope, element) {

            scope.$watch('barDatas', function(barDatas) {

                var w = angular.element($window);

                var nbElements = 0;
                barDatas.forEach(function(d) {
                    nbElements += parseInt(d.nb);
                });

                var x = d3.scale.linear()
                    .domain([0, nbElements])
                    .range([0, 600]);

                // remove graph
                d3.select('.bar').select('svg').remove();

                var svg = d3.select('.bar').append('svg').attr({
                    width: 600,
                    height: '35'
                });

                var bar = svg.selectAll('g')
                    .data(barDatas)
                    .enter()
                    .append('g');

                bar.append('rect')
                    .attr('x', function(d, i) {
                        return scope.getXPosition(x, barDatas, d, i);
                    })
                    .attr('y', 0)
                    .attr('height', 35)
                    .attr('width', 0)
                    .style('fill', function(d, i) {
                        return d.color;
                    })
                    .style('cursor', function(d) {
                        return 'pointer';
                    })
                    .style('text-anchor', 'middle')
                    .on('click', function() {
                        alert('coucou');
                    })
                    .transition()
                    .duration(600)
                    .delay(function(d, i) {
                        return i * 600;
                    })
                    .attr('width', function(d, i) {
                        return x(d.nb);
                    });

                bar.append('text')
                    .attr('x', function(d, i) {
                        return scope.getXPosition(x, barDatas, d, i);
                    })
                    .attr('y', 15)
                    .text(function(d) {
                        return '(' + d.nb + ')' + ' ' + d.status;
                    });
            });

            scope.getXPosition = function(x, barDatas, d, i) {
                if (i === 0) {
                    return 0;
                } else {
                    var res = 0;
                    for (var j = i; j > 0; j--) {
                        res += x(barDatas[j - 1].nb);
                    }
                    console.log('res : ' + res);
                    return res;
                }
            };

        }
    };

});
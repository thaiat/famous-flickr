'use strict';
var controllername = 'home';
var ProgressBar = require('progressbar.js');

module.exports = function(app) {
    /*jshint validthis: true */

    var deps = ['$window', '$famous', app.name + '.photos', app.name + '.famousHelper'];

    function controller($window, $famous, photos, famousHelper) {
        var vm = this;
        vm.viewSize = {
            width: $window.innerWidth,
            height: $window.innerHeight
        };
        vm.headerHeight = 200;
        vm.userName = 'John Doe';

        vm.photos = photos.generate(2 * vm.viewSize.width / 3, 2 * vm.viewSize.width / 3, 30, 3);
        vm.photoMain = photos.generate(vm.viewSize.width * 2, vm.headerHeight * 2)[0][0];
        vm.photoProfile = photos.generate(100, 100)[0][0];

        vm.getPhotoStyle = photos.getStyle;

        var EventHandler = $famous['famous/core/EventHandler'];
        vm.eventHandler = new EventHandler();

        var getScrollView = function() {
            vm.scrollview = famousHelper.getRenderNode(vm.scrollview, '#scrollView');
            return vm.scrollview;
        };

        var getMainPhoto = function() {
            vm.mainPhoto = famousHelper.getRenderNode(vm.mainPhoto, '#mainPhoto');
            return vm.mainPhoto;
        };

        vm.getOverpull = function() {
            return -Math.min(0, getScrollView().getAbsolutePosition());
        };

        vm.getToolbarTranslate = function() {
            var pos = getScrollView().getAbsolutePosition();
            return pos > (vm.headerHeight - 60) ? pos - (vm.headerHeight - 60) : 0;
        };

        var Timer = $famous['famous/utilities/Timer'];
        Timer.every(function() {
            var pos = vm.getOverpull();
            if(getMainPhoto()) {
                vm.mainPhoto.setProperties({
                    webkitFilter: getBlur(pos)
                });
                fillCircle(Math.min(1, pos / 250));
            }

        }, 1);

        function getBlur(pos) {
            var blur = pos > 100 ? Math.min(Math.round((pos - 100) / 15), 10) : 0;
            return 'blur(' + blur + 'px)';
        }

        var fillCircle = function(value) {
            if(vm.circle) {
                vm.circle.set(value);
                return;
            }
            vm.circle = new ProgressBar.Circle($window.document.getElementById('circleSvgContainer'), {
                color: '#3498DB',
                strokeWidth: 4,
                fill: '#FFFFFF'
            });
        };
    }

    controller.$inject = deps;
    app.controller(app.name + '.' + controllername, controller);
};
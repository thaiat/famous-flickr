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
        vm.photoMain = 'images/background_image.jpg'; //photos.generate(vm.viewSize.width * 2, vm.headerHeight * 2)[0][0];
        vm.photoMainBlurred = 'images/background_image_blurred.jpg';
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
            // rever the comments to blur with css
            //             if(getMainPhoto()) {
            //                 vm.mainPhoto.setProperties({
            //                     webkitFilter: 'blur(' + getBlur(pos) + 'px)'
            //                 });
            //             }
            fillCircle(Math.min(1, pos / 250));
        }, 2);

        function getBlur(pos) {
            var distance = 50;
            var blur = pos > distance ? Math.min(Math.round((pos - distance) / 15), 10) : 0;
            return blur;
        }

        vm.getOpacityBlur = function() {
            var pos = vm.getOverpull();

            var blur = getBlur(pos);
            var opacity = Math.min(blur / 10, 1);

            return opacity;
        };

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
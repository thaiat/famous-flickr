'use strict';
var servicename = 'famousHelper';

module.exports = function(app) {

    var dependencies = ['$famous'];

    function service($famous) {
        var getRenderNode = function(cacheEl, findSelector) {
            if(!cacheEl) {
                var el = $famous.find(findSelector)[0];
                if(el) {
                    cacheEl = el.renderNode;
                }
            }
            return cacheEl;
        };

        return {
            getRenderNode: getRenderNode
        };

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
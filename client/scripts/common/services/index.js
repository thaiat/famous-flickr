'use strict';

module.exports = function(app) {
    // inject:start
    require('./famousHelper')(app);
    require('./photos')(app);
    // inject:end
};
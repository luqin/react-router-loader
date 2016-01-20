/**
 * Taken and modified from react-router-proxy-loader to support react-router
 */
var loaderUtils = require("loader-utils");

module.exports = function () {
};
module.exports.pitch = function (remainingRequest) {
  this.cacheable && this.cacheable();
  var query = loaderUtils.parseQuery(this.query);

  var moduleRequest = "!!" + remainingRequest;
  return [
    'var React = require("react");',
    'var component;',
    'var desc = {',
    '    loadComponent: function(callback) {',
    '        if(!component) {',
    '            require.ensure([], function() {',
    '                var module = require(' + JSON.stringify(moduleRequest) + ');',
    '                component = module.__esModule ? module.default : module;',
    '                if(callback) callback(component);',
    '            }' + (query.name ? ', ' + JSON.stringify(query.name) : '') + ');',
    '        } else if(callback) callback(component);',
    '        return component;',
    '    }',
    '};',
    'var mixinReactProxy = require(' + JSON.stringify(require.resolve("./mixinReactProxy")) + ');',
    'mixinReactProxy(React, desc);',
    'module.exports = React.createClass(desc);',
    'module.exports.Mixin = desc;'
  ].join("\n");
};

/**
 * Taken and modified from react-proxy-loader to support react-router
 * willTransitionTo hooks.  See "BEGIN CHANGE" - "END CHANGE" below.
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
    'function requireComponent() {',
    '    var module = require(' + JSON.stringify(moduleRequest) + ');',
    '    return module.__esModule ? module.default : module;',
    '}',
    'var desc = {',
    '    loadComponent: function(callback) {',
    '        if(!component) {',
    '            require.ensure([], function() {',
    '                component = requireComponent();',
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

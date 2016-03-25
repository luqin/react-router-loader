/**
 * Taken and modified from react-router-proxy-loader to support react-router
 */
var loaderUtils = require("loader-utils");

var defaultQueryName;

module.exports = function () {};
module.exports.setDefaultQueryName = function (name) {
  defaultQueryName = name;
}
module.exports.pitch = function (remainingRequest) {
  this.cacheable && this.cacheable();
  var query = loaderUtils.parseQuery(this.query);
  var chunkName;
  if (query.name || defaultQueryName) {
    chunkName = loaderUtils.interpolateName(this, query.name || defaultQueryName, {
      context: query.context || this.options.context,
      content: remainingRequest,
    });
  }
  var chunkNameParam = !!chunkName ? (', ' + JSON.stringify(chunkName)) : '';

  var moduleRequest = '!!' + remainingRequest;
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
    '            }' + chunkNameParam + ');',
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

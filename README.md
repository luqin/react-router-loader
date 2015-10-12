# react-router-loader

Based on [react-proxy-loader](https://github.com/webpack/react-proxy-loader), adapted for [react-router](https://github.com/rackt/react-router) route handlers.

[![NPM version][npm-badge]][npm] [![Build Status][travis-ci-image]][travis-ci-url] [![Gitter][gitter-badge]][gitter]

[![Dependency Status][deps-badge]][deps]
[![devDependency Status][dev-deps-badge]][dev-deps]
[![peerDependency Status][peer-deps-badge]][peer-deps]

[npm-badge]: https://img.shields.io/npm/v/react-router-loader.svg?style=flat-square
[npm]: http://badge.fury.io/js/react-router-loader

[travis-ci-image]: https://travis-ci.org/luqin/react-router-loader.svg
[travis-ci-url]: https://travis-ci.org/luqin/react-router-loader

[gitter-badge]: https://img.shields.io/badge/gitter-join%20chat-f81a65.svg?style=flat-square
[gitter]: https://gitter.im/luqin/react-router-loader?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge

[deps-badge]: https://david-dm.org/luqin/react-router-loader.svg
[deps]: https://david-dm.org/luqin/react-router-loader

[dev-deps-badge]: https://david-dm.org/luqin/react-router-loader/dev-status.svg
[dev-deps]: https://david-dm.org/luqin/react-router-loader#info=devDependencies

[peer-deps-badge]: https://david-dm.org/luqin/react-router-loader/peer-status.svg
[peer-deps]: https://david-dm.org/luqin/react-router-loader#info=peerDependencies

## Installation

`npm install react-router-loader`

## Dependencies

Which version to use depends on your version of `react-router`

| react-router     | react-router-loader |
| ---------------- | ------------------------- |
| 1.x and above | 0.4.x                     |
| 0.13.x | 0.3.x                     |


## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

Use when requiring the `component` for a `Route`, and the component will only be loaded when the route is rendered.

```js
<Route component={require('react-router!./User')} />
```

Note that `willTransitionTo` and `willTransitionFrom` will still be called on the dynamically-loaded component.


### Named chunks

If you have nested or sibling Routes that you want to be loaded together, you can name the components using `?name=chunkName`

```js
<Route name="user" component={require('react-router?name=user!./User')}>
    <Route name="details" component={require('react-router?name=user!./UserDetails')}>
    <Route name="settings" component={require('react-router?name=user!./UserSettings')}>
    <Route name="other" component={require('react-router?name=user!./UserOther')}>
</Route>
```

This will cause the `user` chunk to be loaded if any of the three user pages is loaded.  It will also mean that you won't need two separate calls for the base class and child class.


# License

MIT (http://www.opensource.org/licenses/mit-license.php)

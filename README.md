# react-router-loader

Based on [react-proxy-loader](https://github.com/webpack/react-proxy-loader), adapted for [react-router](https://github.com/rackt/react-router) route handlers.

[![NPM version][npm-badge]][npm] [![Gitter][gitter-badge]][gitter]

[![Dependency Status][deps-badge]][deps]
[![devDependency Status][dev-deps-badge]][dev-deps]
[![peerDependency Status][peer-deps-badge]][peer-deps]

[npm-badge]: https://img.shields.io/npm/v/react-router-loader.svg?style=flat-square
[npm]: http://badge.fury.io/js/react-router-loader

[gitter-badge]: https://img.shields.io/badge/gitter-join%20chat-f81a65.svg?style=flat-square
[gitter]: https://gitter.im/uooo/react-router-loader?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge

[deps-badge]: https://david-dm.org/uooo/react-router-loader.svg
[deps]: https://david-dm.org/uooo/react-router-loader

[dev-deps-badge]: https://david-dm.org/uooo/react-router-loader/dev-status.svg
[dev-deps]: https://david-dm.org/uooo/react-router-loader#info=devDependencies

[peer-deps-badge]: https://david-dm.org/uooo/react-router-loader/peer-status.svg
[peer-deps]: https://david-dm.org/uooo/react-router-loader#info=peerDependencies

## Installation

`npm install react-router-loader`

## Dependencies

Which version to use depends on your version of `react-router`

| react-router     | react-router-loader |
| ---------------- | ------------------------- |
| 0.13.x and above | 0.4.x                     |


## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

Use when requiring the `handler` for a `Route`, and the component will only be loaded when the route is rendered.

```js
<Route name="user" handler={require('react-router!./User.jsx')} />
```

Note that `willTransitionTo` and `willTransitionFrom` will still be called on the dynamically-loaded component.


### Named chunks

If you have nested or sibling Routes that you want to be loaded together, you can name the components using `?name=chunkName`

```js
<Route name="user" handler={require('react-router?name=user!./User.jsx')}>
    <Route name="details" handler={require('react-router?name=user!./UserDetails.jsx')}>
    <Route name="settings" handler={require('react-router?name=user!./UserSettings.jsx')}>
    <Route name="other" handler={require('react-router?name=user!./UserOther.jsx')}>
</Route>
```

This will cause the `user` chunk to be loaded if any of the three user pages is loaded.  It will also mean that you won't need two separate calls for the base class and child class.


# License

MIT (http://www.opensource.org/licenses/mit-license.php)

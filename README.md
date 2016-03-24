# react-router-loader

Based on [react-router-proxy-loader](https://github.com/odysseyscience/react-router-proxy-loader) and [react-proxy-loader](https://github.com/webpack/react-proxy-loader), adapted for [react-router](https://github.com/rackt/react-router) route handlers.

[![NPM version][npm-badge]][npm] [![Build Status][travis-ci-image]][travis-ci-url]

[![Dependency Status][deps-badge]][deps]
[![devDependency Status][dev-deps-badge]][dev-deps]
[![peerDependency Status][peer-deps-badge]][peer-deps]

[npm-badge]: https://img.shields.io/npm/v/react-router-loader.svg?style=flat-square
[npm]: https://www.npmjs.com/package/react-router-loader

[travis-ci-image]: https://travis-ci.org/luqin/react-router-loader.svg
[travis-ci-url]: https://travis-ci.org/luqin/react-router-loader

[deps-badge]: https://david-dm.org/luqin/react-router-loader.svg
[deps]: https://david-dm.org/luqin/react-router-loader

[dev-deps-badge]: https://david-dm.org/luqin/react-router-loader/dev-status.svg
[dev-deps]: https://david-dm.org/luqin/react-router-loader#info=devDependencies

[peer-deps-badge]: https://david-dm.org/luqin/react-router-loader/peer-status.svg
[peer-deps]: https://david-dm.org/luqin/react-router-loader#info=peerDependencies

## Installation


```sh
npm install react-router-loader --save-dev
```

## Dependencies

Which version to use depends on your version of `react-router`

| react-router     | react-router-loader |
| ---------------- | ------------------------- |
| 1.x | 0.4.x                     |
| 2.x and above | 0.5.x                     |


## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

Use when requiring the `component` for a `Route`, and the component will only be loaded when the route is rendered.

```js
<Route component={require('react-router!./Component')} />
```

### Named chunks

You can give the chunk a name with the `name` query parameter:

```js
<Route component={require('react-router?name=chunkName!./Component')} />
```

#### Named chunks with placeholders (0.5.1 and above)

You can also use the [standard Webpack placeholders](https://github.com/webpack/loader-utils#interpolatename) in the name of your chunks.

```js
<Route path="details" component={require('react-router-proxy?name=[name]!./UserDetails.jsx')}>
<Route path="settings" component={require('react-router-proxy?name=[name]!./UserSettings.jsx')}>
<Route path="other" component={require('react-router-proxy?name=[name]!./UserOther.jsx')}>
```

Would generate three chunks, exported in `userdetails.js`, `usersettings.js` and so on.
Using this approach allows you to setup your loader globally through an exclude/include rule in your `webpack.config.js`.
To avoid conflicts it may be best to prefix your `name` with a subfolder name, such as `routes/`:

```js
loaders: [
    {
        test: /\.js$/,
        exclude: /src\/Pages/,
        loader: 'babel',
    },
    {
        test: /\.js$/,
        include: /src\/Pages/,
        loaders: ['react-router-proxy?name=routes/[name]', 'babel'],
    }
],
```

This has the advantage of making your router a lot leaner:

```js
<Route path="details" component={require('./UserDetails.jsx')}>
<Route path="settings" component={require('./UserSettings.jsx')}>
<Route path="other" component={require('./UserOther.jsx')}>
```

The generated files would then go into `routes/userdetails`, `routes/usersettings` etc.

## Changelog

##### 0.5.4

 - Added named chunks with placeholders

##### 0.5.0

 - Upgraded to react-router 2.x

# License

MIT (http://www.opensource.org/licenses/mit-license.php)

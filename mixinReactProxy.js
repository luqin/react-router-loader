module.exports = function (React, desc) {
  desc.displayName = "ReactRouterProxy";
  desc.getInitialState = function () {
    return { component: this.loadComponent() };
  };
  desc.componentDidMount = function () {
    this.___isMounted = true;
    if (!this.state.component) {
      this.loadComponent(function (component) {
        if (this.___isMounted) {
          this.setState({ component: component });
        }
      }.bind(this));
    }
  };
  desc.componentWillUnmount = function () {
    this.___isMounted = false;
  };
  desc.render = function () {
    var Component = this.state.component;
    if (Component) {
      return React.createElement(Component, this.props, this.props.children);
    } else if (this.renderUnavailable) {
      return this.renderUnavailable();
    }
    return null;
  };
};

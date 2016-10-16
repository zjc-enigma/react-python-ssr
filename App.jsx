var Immutable = require('immutable');
var React = require('react');
var Route = require('react-router').Route;
var Router = require('react-router');
/* v0.13.x
 * Router.run(routes, (Handler) => {
 *   React.render(<Handler/>, el);
 * })

 * // v1.0
 * React.render(<Router>{routes}</Router>, el)

 * // 类似这样：
 * React.render((
 *   <Router>
 *     <Route path="/" component={App}/>
 *   </Router>
 * ), el);

 * // 当然也可以这样
 * React.render(<Router routes={routes}/>, el)*/

/* 
 * // v0.13.x
 * Router.run(routes, Router.BrowserHistory, (Handler) => {
 *   React.render(<Handler/>, el);
 * })
 * 
 * // v1.0
 * import createBrowserHistory from 'history/lib/createBrowserHistory'
 * let history = createBrowserHistory()
 * React.render(<Router history={history}>{routes}</Router>, el)
 * */

/* 
 * // v0.13.x
 * <Route name="about" handler={About}/>
 * 
 * // v1.0
 * <Route path="about" component={About}/>
 * 
 * */
var App = React.createClass({

  render () {
    return (
      <div className='app'>
        {this.props.data.get('message')}
      </div>
    );
  }
});

var routes = (
  <Route path="/hello" handler={App} />
);

var App = module.exports = {

  /** Initialize with the necessary page data **/
  initialize (pageData) {
    this.pageData = Immutable.fromJS(pageData);
  },

  /** Render a live React component into the DOM (browser) **/

  render (domNode) {
    
    React.render(<Router history={history}>{routes}</Router>, el)

    Router.run(routes, Router.HistoryLocation, Handler => {
      React.render(<Handler data={this.pageData}/>, domNode);
    });
  },

  /** Render static markup (server) **/
  renderHtml (path, cb) {
    Router.run(routes, path, Handler => {
      cb(React.renderToString(<Handler data={this.pageData}/>));
    });
  }
};

/** If the context is a browser, render the app **/
if (typeof window !== 'undefined') {
  var pageData = JSON.parse(document.getElementById('page-data').getAttribute('data-page'));
  App.initialize(pageData);
  App.render(document.getElementById('app-container'));
}

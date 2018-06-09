import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


// const routes = [
//   {
//     path: '/sandwiches',
//     component: Sandwiches
//   },
//   {
//     path: '/tacos',
//     component: Tacos,
//     routes: [
//       {
//         path: '/tacos/bus',
//         component: Bus
//       },
//       {
//         path: '/tacos/cart',
//         component: Cart
//       }
//     ]
//   }
// ];

// const RouteWithSubRoutes = route => (
//   <Route
//     path={route.path}
//     render={props => (
//       // pass the sub-routes down to keep nesting
//       <route.component {...props} routes={route.routes} />
//     )}
//   />
// );
import Dashboard from '../screens/Dashboard'
const routes = [
  {
    key:'charts',
    path: '/',
    component: Dashboard
  },
];

const RouteChildren = route => (
  <Route
    path={route.path}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} />
    )}
  />
);

const RouteConfig = () => (
  <Router>
    <React.Fragment>
      {routes.map((route) => <RouteChildren key={route.key} {...route} />)}
    </React.Fragment>
  </Router>
);

export default RouteConfig;

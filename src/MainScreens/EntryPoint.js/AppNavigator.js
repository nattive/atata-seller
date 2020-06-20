import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  Redirect,
} from "react-router-dom";
import { Routes as RouteConfig } from "../../Partials/Route";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export default function AppNavigator() {
  return (
    <Router>
      <Switch>
        <Route path="*">
          <AnimationApp />
        </Route>
      </Switch>
    </Router>
  );
}

function AnimationApp() {
  let location = useLocation();
  return(

    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Switch location={location}>
          {RouteConfig.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              children={<route.main />}
            />
          ))}
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
}
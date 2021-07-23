import React from "react";
import Home from './components/Home';
import { Route, Switch } from "react-router-dom";
import Form from "./components/Form";
import HomeButton from "./components/HomeButton";

const App = () => {
  return (
    <div>
      <HomeButton />
      <Switch>
        <Route path = '/pizza'>
          <Form />
        </Route>
        <Route path = '/'>
          <Home />
        </Route>
      </Switch>
    </div>
  );
};
export default App;

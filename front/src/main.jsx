import provider from './context/provider';
import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './pages/login';
import Panel from './pages/panel';
import {Switch, Route, Redirect} from 'wouter'


const Main = () => {
  return (
    <provider>
    <Switch>
      <Route path="/login" component={Login}/>
      <Route path="/" component={Panel} />
      <Redirect to="/login" />
    </Switch>
    </provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
)

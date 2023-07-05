import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './pages/login';
import Panel from './pages/panel';
import {Swicht, Route, Redirect} from 'wouter'


const Main = () => {
  return (
    <Swicht>
      <Route path="/login" component={Login}/>
      <Route path="/" component={Panel} />
      <Redirect to = "/login" />
    </Swicht>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
)

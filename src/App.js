import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter, Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <HashRouter>
      <Route exact path="/">
        <Homepage></Homepage>
      </Route>
      <Route exact path="/signup">
        <Signup></Signup>
      </Route>
      <Route exact path="/login">
        <Login></Login>
      </Route>
    </HashRouter>
  );
}

export default App;

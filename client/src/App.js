import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Home from "./pages/Home"
import SignupLogin from "./pages/SignupLogin";
import Wines from "./pages/Wines";
import EmployeePage from "./pages/EmployeePage";
import Admin from "./pages/Admin";
// import Saved from "./pages/Saved";
import NoMatch from "./pages/NoMatch";
import Quiz from "./pages/Quiz";
// import Nav from "./components/Nav";
// import Question from "./pages/Question";
function App() {
  return (
    <Router basename = {process.env.PUBLIC_URL}>
      
        {/* <Nav /> */}
        <Switch>
        {/* <Route exact path="/" component={Home} /> */}

        <Route exact path="/" component={SignupLogin}   />
        <Route exact path="/admin" component={Admin}   />
        <Route exact path="/wines" component={Wines} />
        <Route exact path="/quiz" component={Quiz } />
        <Route exact path="/employeepage" component={EmployeePage} />
          <Route component={NoMatch} />
        </Switch>
      
    </Router>
  );
}

export default App;

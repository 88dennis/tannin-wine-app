import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
// import Footer from "../components/Footer";
import SignupLoginForm from "../components/SignupLoginForm";
import API from "../utils/API";
import { Container } from "../components/Grid";

class SignupLogin extends Component {
  state = {
    showMe: false,
    restaurant: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    loginemail: "",
    loginpassword: "",
    loggedIn: false,
    loginMessage:"",
    signupMessage:"",
    redirectTo: null,
    user:""
  }

  hideShow = () => {
    const newState = { ...this.state }
    newState.showMe = !newState.showMe
    newState.scale = this.state.scale > 1 ? 1 : 1.5
    this.setState(newState);
  }

  handleSubmitInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value

    });
  }

  handleSignupFormSubmit = async event => {
    event.preventDefault();
    const { restaurant, firstName, lastName, email, password } = this.state;
    if (firstName && lastName && restaurant && email && password) {
      const userInfo = { firstName, lastName, restaurant, email, password }
      const loginInfor = { email, password }
      // console.log(userInfo);
      API.signUpSubmit(userInfo).then(response => {
        if (!response.data.error) {
          console.log('youre good')
          API.logIn(loginInfor).then(response => {
            console.log("USER OBJ: ", response);
            if (response.status === 200) {
              if (response.data.isAdmin) {
                this.setState({
                  redirectTo: '/admin',
                  loggedIn: true,
                  user: response.data.user,
                });
              }
              else {
                this.setState({
                  loggedIn: true,
                  redirectTo: "/employeepage",
                  user: response.data.user,
                });
              }
            }
          }).catch(err => {
            console.log(err)
          });

        }
        else {
          this.setState({
            redirectTo: null,
            loggedIn: false,
            signupMessage: "Email already exist, please log in"
          })
          console.log(response.data.error)
        }
      })
    }
  }

  handleLoginInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value

    });
  }

  handleLoginFormSubmit = event => {
    event.preventDefault();
    const loginInfor = { email: this.state.loginemail, password: this.state.loginpassword }
    API.logIn(loginInfor).then(response => {
      console.log("USER OBJ: ", response);
      if (response.status === 200) {
        // update the state
        if (response.data.isAdmin) {
          this.setState({
            loggedIn: true,
            user: response.data.user,
            redirectTo: '/admin'
          });
        }
        else {
          this.setState({
            redirectTo: "/employeepage",
            loggedIn: true,
            user: response.data.user
          });
        }
      }
      else {
       
      this.setState({
        loginMessage: "Email does not exist!"
      })
      }
    }).catch(err => {
      console.log(err);
      this.setState({
        loginMessage: "Email does not exist!"
      })

    });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    }
    return (
      <Container>
                <div className="tannintextwrap2">Tannin</div>
        <SignupLoginForm
          handleSubmitInputChange={this.handleSubmitInputChange}
          handleSignupFormSubmit={this.handleSignupFormSubmit}
          id={this.state.id}
          restaurant={this.state.restaurant}
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          email={this.state.email}
          password={this.state.password}
          handleLoginInputChange={this.handleLoginInputChange}
          handleLoginFormSubmit={this.handleLoginFormSubmit}
          loginemail={this.state.loginemail}
          loginpassword={this.state.loginpassword}
          loginMessage={this.state.loginMessage}
          signupMessage={this.state.signupMessage}
          showMe={this.state.showMe}
          hideShow={this.hideShow}
        />
        {/* <Footer /> */}
      </Container>
    );
  }
}

export default SignupLogin;

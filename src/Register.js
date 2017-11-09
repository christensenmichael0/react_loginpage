import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Login from './Login';
import $ from 'jquery';

var apiBaseUrl = "http://10.90.71.225:6543/api"

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      email:'',
      password:'',
      password_confirm:''
    }
  }
  componentWillReceiveProps(nextProps){
    console.log("nextProps",nextProps);
  }
  handleClick(event,role){
    var self = this;
    //To be done:check for empty values before hitting submit.. also check if pwds are matching
    if(this.state.first_name.length>0 && this.state.last_name.length>0 && this.state.email.length>0 && this.state.password.length>0){

    // place holder for now
    var registrationSuccess = true;

    if (registrationSuccess) {
      var loginscreen=[];
      loginscreen.push(<Login parentContext={this} appContext={self.props.appContext}/>);

      var loginmessage = "Not Registered yet? Go to registration";

      self.props.parentContext.setState({loginscreen:loginscreen,
        loginmessage:loginmessage,
        buttonLabel:"Register",
        isLogin:true
      });
    }

    }
    else{
      alert("Input field value is missing");
    }

  }
  render() {
    // console.log("props",this.props);

    var userhintText="Enter your email";
    var userLabel="Email";
    
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             showMenuIconButton={false}
             title="Register"
           />
           <TextField
             hintText="Enter your First Name"
             floatingLabelText="First Name"
             onChange = {(event,newValue) => this.setState({first_name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Last Name"
             floatingLabelText="Last Name"
             onChange = {(event,newValue) => this.setState({last_name:newValue})}
             />
           <br/>
           <TextField
             hintText={userhintText}
             floatingLabelText={userLabel}
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <TextField
           type = "password"
           hintText="Confirm your Password"
           floatingLabelText="Confirm Password"
           onChange = {(event,newValue) => this.setState({password_confirm:newValue})}
           />
           <br/>
           <div style={{textAlign: 'right'}}>
            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
           </div>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Register;
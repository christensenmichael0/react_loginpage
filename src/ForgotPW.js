import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Login from './Login';
import $ from 'jquery';

var apiBaseUrl = "http://10.90.71.225:6543/api"

class ForgotPW extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
    }
  }
  componentWillReceiveProps(nextProps){
    console.log("nextProps",nextProps);
  }
  handleClick(event,role){
    var self = this;
    //To be done:check for valid email
    var valid_email = true;
    if(valid_email){
      var loginscreen=[];
      loginscreen.push(<Login parentContext={self} appContext={self.props.appContext}/>);

      var loginmessage = "Not Registered yet? Go to registration";

      self.props.parentContext.setState({loginscreen:loginscreen,
        loginmessage:loginmessage,
        buttonLabel:"Register",
        isLogin:true,
        forgotPW:false
      });


    }
    else{
      alert("Non valid email");
    }

  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             showMenuIconButton={false}
             title="Recover Password"
           />
           <TextField
             hintText="Enter your email"
             floatingLabelText="Email"
             fullWidth={true}
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <div style={{textAlign: 'right'}}>
            <RaisedButton label="Submit" primary={true} onClick={(event) => this.handleClick(event)}/>
           </div>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

export default ForgotPW;
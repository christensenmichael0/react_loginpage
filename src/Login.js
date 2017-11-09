import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TestComponent from './test_component.js'
import ForgotPW from './ForgotPW';
import $ from 'jquery';

var apiBaseUrl = "http://10.90.71.225:6543/api"

class ForgotLink extends Component {
   render() {
      var myStyle = {
         fontSize: 10,
         color: '#0088cc',
         cursor: 'pointer',
         padding: 10,
      }
      return (
         <div>
            <p style={{marginTop:8, marginBottom:0, marginLeft: 0, textAlign:'left'}}>
              <a onClick = {this.props.handleForgotPW} style = {myStyle}>Forgot Password</a>
            </p>
         </div>
      );
   }
}

class Login extends Component {
  constructor(props){
    super(props);
    var localloginComponent=[];
    localloginComponent.push(
      <MuiThemeProvider>
        <div>
         <TextField
           hintText="Enter your email"
           floatingLabelText="Email"
           onChange = {(event,newValue) => this.setState({email:newValue})}
           />
         <br/>
           <TextField
             type="password"
             hintText="Enter your password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <ForgotLink handleForgotPW={this.handleForgotPW}/>
           <RaisedButton label="Sign in" primary={true} onClick={(event) => this.handleClick(event)}/>
       </div>
       </MuiThemeProvider>
    )
    this.state={
      email:'',
      password:'',
      loginComponent:localloginComponent,
      authRetries: 0,
    }
    this.handleForgotPW = this.handleForgotPW.bind(this);
  }
  componentWillMount(){
    var localloginComponent=[];
    localloginComponent.push(
      <MuiThemeProvider>
        <div style={{textAlign: 'left'}}>
         <TextField
           hintText="Enter your email"
           floatingLabelText="Email"
           fullWidth={true}
           onChange = {(event,newValue) => this.setState({email:newValue})}
           />
         <br/>
           <TextField
             type="Password"
             hintText="Enter your password"
             floatingLabelText="Password"
             fullWidth={true}
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <ForgotLink handleForgotPW={this.handleForgotPW} />
           <div style={{textAlign: 'right'}}>
            <RaisedButton label="Sign in" primary={true} onClick={(event) => this.handleClick(event)}/>
           </div>
       </div>
       </MuiThemeProvider>
    )
    this.setState({loginComponent:localloginComponent})
  }

  handleClick(event){
    var self = this;
    // var authData={
    //   "email":this.state.email,
	   //  "password":this.state.password,
    // }

    var authData={
      "email":'Brian.McKenna@rpsgroup.com',
      "password":'',
    }

    var verifyCredentials = $.ajax({
      url: apiBaseUrl + '/login/',
      dataType: 'json',
      type: 'POST',
      data: authData
    });

    verifyCredentials.done(function(res) {
        if ('token' in res) {
          // self.props.handleJWTUpdate(res.token);
          console.log('token was succesfully returned!')

          var testPage=[];
          testPage.push(<TestComponent appContext={self.props.appContext} />)
          self.props.appContext.setState({loginPage:[],testPage:testPage})

        } else {
          self.setState({authRetries: self.state.authRetries + 1})
          console.log('number of trys: ' + self.state.authRetries)

          if (self.state.authRetries > 1) {
            console.log('Retry count exceeded');
          } else {
            // do something here.. the recursive call doesnt make sense
            // self.authenticateUser();
          }
        }
      });

      verifyCredentials.fail(function(jqXHR, textStatus, errorThrown) {
          console.log('Server error: ', textStatus);
        });
  }

  handleForgotPW(event) {

    var loginscreen=[], loginmessage=[];
    loginscreen.push(<ForgotPW parentContext={this} appContext={this.props.appContext} />);
    loginmessage.push(<p style={{color: '#737373', fontSize: 12}}>Back to Sign in</p>);

    var loginButtons=[];
    loginButtons.push(
      <div>
      <MuiThemeProvider>
        <div>
           <RaisedButton label={"Sign in"} style={{marginTop: 10}} onClick={(event) => this.props.parentContext.handleClick(event)}/>
       </div>
       </MuiThemeProvider>
      </div>
    )

    this.props.parentContext.setState({
       loginscreen:loginscreen,
       loginmessage:loginmessage,
       loginButtons:loginButtons,
       isLogin:false,
       forgotPW:true
    })
  }
  
  render() {
    return (
      <div>
        <MuiThemeProvider>
        <AppBar
            showMenuIconButton={false}
            title="Sign in"
           />
        </MuiThemeProvider>
        <MuiThemeProvider>
        <div>
        <p>RPS ASA</p>
        </div>
        </MuiThemeProvider>
        {this.state.loginComponent}
      </div>
    );
  }
}


export default Login;
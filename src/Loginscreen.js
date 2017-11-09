import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import Login from './Login';
import Register from './Register';
import ForgotPW from './ForgotPW';

class Loginscreen extends Component {
  constructor(props){
    super(props);
    var loginButtons=[];
    loginButtons.push(
      <div>
      <MuiThemeProvider>
        <div>
           <RaisedButton label={"Register"} onClick={(event) => this.handleClick(event)}/>
       </div>
       </MuiThemeProvider>
      </div>
    )
    this.state={
      username:'',
      password:'',
      loginscreen:[],
      loginmessage:[],
      loginButtons:loginButtons,
      registerbuttonLabel:'Register',
      isLogin:true,
      forgotPW: false
    }
  }
  componentWillMount(){
    var loginscreen=[];
    var loginmessage=[];
    loginscreen.push(<Login parentContext={this} appContext={this.props.appContext}/>);
    loginmessage.push(<p style={{color: '#737373', fontSize: 12}}>Not registered yet? Register Now</p>);
    this.setState({
                  loginscreen:loginscreen,
                  loginmessage:loginmessage
                    })
  }
  handleClick(event){
    var loginmessage;
    if(this.state.isLogin){
      var loginscreen=[];
      var loginmessage=[];
      loginscreen.push(<Register parentContext={this} appContext={this.props.appContext} />);
      loginmessage.push(<p style={{color: '#737373', fontSize: 12}}>Already registered? Go to Sign in</p>);
      var loginButtons=[];
      loginButtons.push(
        <div>
        <MuiThemeProvider>
          <div>
             <RaisedButton label={"Sign in"} style={{clear: 'both'}} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
        </div>
      )
      this.setState({
                     loginscreen:loginscreen,
                     loginmessage:loginmessage,
                     loginButtons:loginButtons,
                     isLogin:false
                   })
    } else {
      var loginscreen=[],loginButtons=[],loginmessage=[];;
      loginButtons.push(
        <div>
        <MuiThemeProvider>
          <div>
             <RaisedButton label={"Register"} style={{clear: 'both'}} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
        </div>
      )
      loginscreen.push(<Login parentContext={this} appContext={this.props.appContext} />);
      loginmessage.push(<p style={{color: '#737373', fontSize: 12}}>Not registered yet? Register Now</p>);
      this.setState({
                     loginscreen:loginscreen,
                     loginmessage:loginmessage,
                     loginButtons:loginButtons,
                     isLogin:true
                   })
    }
  }

  render() {
    return (
      <div className="loginscreen">
        {this.state.loginscreen}
        <div>
          {this.state.loginmessage}
          {this.state.loginButtons}
        </div>
      </div>
    );
  }
}


export default Loginscreen;
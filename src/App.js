import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import $ from 'jquery';


import './App.css';
import LoginScreen from './Loginscreen';
import TestComponent from './test_component.js'
//import UploadScreen from './UploadScreen';
//import UploadPage from './UploadPage';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loginPage:[],
      testPage:[],
    }
  }
  componentWillMount(){
    var loginPage =[];
    loginPage.push(<LoginScreen appContext={this}/>);
    this.setState({
                  loginPage:loginPage
                    })
  }
  render() {
    return (
      <div className="App">
        {this.state.loginPage}
        {this.state.testPage}
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default App;

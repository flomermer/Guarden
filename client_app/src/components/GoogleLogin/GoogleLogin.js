import React, {Component} from 'react';
import './style.css';

import axios from 'axios';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUser, fetchTreeUsers} from '../../actions/index.js';

import {ROOT_API} from '../../consts/consts';
import {USER_ID} from '../../consts/consts';
import {Redirect} from 'react-router-dom';

import { GoogleLogin as GoogleAuth } from 'react-google-login-component';
import imgGoogleBtn from '../../images/google_icon.png';
const imgLogo  = 'https://image.ibb.co/h1VNWo/guarden_logo.png';

const socialID = `847712332173-6rs9bb850ls7piqt8fqpqrqgqfu0t32c.apps.googleusercontent.com`


class GoogleLogin extends Component{
  constructor(props){
   super(props);

   this.responseGoogle = this.responseGoogle.bind(this);
   this.quickLogin = this.quickLogin.bind(this);

   console.log(`Running with service: ${ROOT_API}. you can modify it from './consts/consts'`);
  }
  componentDidMount(){
    //this.quickLogin();
  }
  quickLogin(){
    //console.log(USER_ID);    
    this.props.fetchUser(USER_ID);
    this.props.fetchTreeUsers(USER_ID);
  }
  login(user){
    const url = `${ROOT_API}/user/googleLogin`;
    const req = axios.post(url, user);
    req.then((res) => {
      const user_id = res.data._id;

      this.props.fetchUser(user_id);
      this.props.fetchTreeUsers(user_id);
    }).catch((err) => {
      console.log(err);
    });
  }
  responseGoogle (googleUser) {
    const googleID = googleUser.getId();
    const googleToken = googleUser.getAuthResponse().id_token;
    const profile = googleUser.getBasicProfile();
    const email = profile.U3;
    const fullName = profile.ig;
    const pic = profile.Paa;
    var user = {
      googleID,
      googleToken,
      email,
      fullName,
      pic
    }

    this.login(user);
  }
  render(){
    const user = this.props.user;
    if(user)
      return <Redirect to='/' />;

    return(
      <div className="GoogleLogin">
          <div className="logo-container">
            <img src={imgLogo} alt='' />
          </div>

          <div className='login-container'>
              <GoogleAuth socialId={socialID}
                         className="google-login"
                         scope="profile"
                         fetchBasicProfile={true}
                         responseHandler={this.responseGoogle}
                         buttonText="Login With Google"
              />
            <div className="google_bth"><img src={imgGoogleBtn} alt='' /></div>
          </div>
      </div>

    );
  }
}
function mapStateToProps(state){
  return {user: state.user}
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchUser, fetchTreeUsers}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(GoogleLogin);

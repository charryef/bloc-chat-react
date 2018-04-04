import React, { Component } from 'react';
import './User.css';

class User extends Component {
  /*register an onAuthStateChanged event handler to respond to sign-in
  and sign out events in Firebase*/
  componentDidMount () {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  //the sign in button should call Firebase's signInWithPopup method
  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }


  signOut() {
    this.props.firebase.auth().signOut();
  }

  render (){
    return (
      <div id="user">
        <h2 className="welcome">Welcome, { this.props.user ? this.props.user.displayName : 'guest' }!</h2>
        {this.props.user ?
          <button className="sign-out-button" onClick={this.signOut.bind(this)}>Sign Out</button>
          :
          <button className="sign-in-button" onClick={this.signIn.bind(this)}>Sign in with Google</button>
        }
      </div>
    );
  }
}

export default User;

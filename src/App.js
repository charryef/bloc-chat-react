import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js'

//initialize Firebase
var config = {
  apiKey: "AIzaSyD4DwGT9ZXyWK9gM9kd6HY2UT4mCxL4AR8",
  authDomain: "bloc-chat-1234f.firebaseapp.com",
  databaseURL: "https://bloc-chat-1234f.firebaseio.com",
  projectId: "bloc-chat-1234f",
  storageBucket: "bloc-chat-1234f.appspot.com",
  messagingSenderId: "896721025003"
};

firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: '',
      user: null
    };
  }

  setRoom(room){
    this.setState({ activeRoom: room });
  }

  //create a setUser method
  setUser(user) {
    this.setState({ user: user });
  }



  render() {
    return (
      <div className="App">
        <header>
          <h1>Bloc Chat</h1>
        </header>
        <main>
          <RoomList firebase={ firebase } activeRoom={this.state.activeRoom}  setRoom={this.setRoom.bind(this)}/>
          <MessageList firebase = { firebase } activeRoom={this.state.activeRoom} />
          <User firebase={ firebase } setUser={this.setUser.bind(this)} user={this.state.user}/>
        </main>
      </div>
    );
  }
}

export default App;

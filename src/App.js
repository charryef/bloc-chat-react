import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

var config = {
  apiKey: "AIzaSyD4DwGT9ZXyWK9gM9kd6HY2UT4mCxL4AR8",
  authDomain: "bloc-chat-1234f.firebaseapp.com",
  databaseURL: "https://bloc-chat-1234f.firebaseio.com",
  projectId: "bloc-chat-1234f",
  storageBucket: "bloc-chat-1234f.appspot.com",
  messagingSenderId: "896721025003"
};

firebase.initializeApp(config);

//when activeRoom is hardcoded, it displays the messages.
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: 'Mock Chat'
    };
  }

setRoom(room){
  this.setState({ activeRoom: room });
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
        </main>
      </div>
    );
  }
}

export default App;

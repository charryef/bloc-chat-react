import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        <header>
          <h1>Bloc Chat</h1>
        </header>
        <main>
          <RoomList firebase={ firebase } />
        </main>
      </div>
    );
  }
}

export default App;

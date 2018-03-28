import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.jsx'


// Initialize Firebase
var config = {
    apiKey: "AIzaSyDQ7J1Wf1_Y0TIttJCePD4n2_vn_tdXVao",
    authDomain: "react-bloc-chat-32b88.firebaseapp.com",
    databaseURL: "https://react-bloc-chat-32b88.firebaseio.com",
    projectId: "react-bloc-chat-32b88",
    storageBucket: "react-bloc-chat-32b88.appspot.com",
    messagingSenderId: "381884651448"
  };
firebase.initializeApp(config);


class App extends Component {
  render() {
    return (
      <div className="app">
        <header>
          <h1 className="app-header">Bloc Chat</h1>
        </header>
        <main>
          <RoomList
            firebase={firebase}
          />
        </main>
      </div>
    );
  }
}

export default App;

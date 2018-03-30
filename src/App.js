import React, { Component } from 'react';
import { Layout } from 'antd';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.jsx'

const { Header, Content } = Layout;

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
      <Layout>
        <Header className="header">
          <h1>Bloc Chat</h1>
        </Header>
        <Layout>
            <RoomList
              firebase={firebase}
             />
        </Layout>
        <Layout style={{ marginLeft: 220, height: '100vh' }}>
          <Content className='main-content'>
            ChatRoom
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;

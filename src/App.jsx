import React, { Component } from 'react';
import { Layout } from 'antd';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.jsx'
import MessageList from './components/MessageList.jsx'


const { Header, Content, Sider } = Layout;

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
  constructor(props) {
    super(props);
    this.state = ({
      activeRoom: '',
    });
    
    this.setActiveRoom = this.setActiveRoom.bind(this);
  }
  
  setActiveRoom(room) {
    this.setState({ activeRoom: room });
  }
  
  render() {
    const activeRoom = this.state.activeRoom;
    
    return (
      <Layout>
        <Header className="header">
          <h1>Bloc Chat</h1>
        </Header>
        
        <Sider className="side-nav">
          <RoomList
            firebase={firebase}
            setRoom={this.setActiveRoom}
           />
        </Sider>
        
        <Layout className="main-content">
            <MessageList
              firebase={firebase}
              room={activeRoom}
            />
        </Layout>
      </Layout>
    );
  }
}

export default App;

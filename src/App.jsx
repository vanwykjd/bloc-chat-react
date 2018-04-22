import React, { Component } from 'react';
import { Layout } from 'antd';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.jsx';
import MessageList from './components/MessageList.jsx';
import User from './components/User.jsx';


const { Header, Sider } = Layout;

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
      user: '',
      activeRoom: '',
    });
    
    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }
  
  setActiveRoom(room) {
    this.setState({ activeRoom: room });
  }
  
  setUser(user) {
    this.setState({ user: user })
  }
  
  render() {
    const activeRoom = this.state.activeRoom;
    const user = this.state.user;
    return (
      
      <Layout>
        <Header className="header">
          <h1>Bloc Chat</h1>
        </Header>
        <Sider className="side-nav">
          
          <User
              firebase={firebase}
              setUser={this.setUser}
              user={user}
            />
         
          <RoomList
            firebase={firebase}
            setRoom={this.setActiveRoom}
            user={user}
           />
        </Sider>
        
        <Layout className="main-content">
          <MessageList
            firebase={firebase}
            room={activeRoom}
            user={user}
          />
        </Layout>
      </Layout>
    );
  }
}

export default App;

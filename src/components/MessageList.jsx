import React, { Component } from 'react';
import CreateMessage from './CreateMessage.jsx';
import Message from './Message.jsx';
import { Layout, List } from 'antd';

const { Header, Footer } = Layout;

class MessageList extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    
    this.messagesOrderedRef = this.props.firebase.database().ref('messages').orderByChild('sentAt');
    this.messagesRef = this.props.firebase.database().ref('messages');
    this.sendMessage = this.sendMessage.bind(this);

    this.onRoomChange = this.onRoomChange.bind(this);
    this.scrollToCurrent = this.scrollToCurrent.bind(this);
  }

  componentDidMount() { 
    this.messagesOrderedRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    });
 
  }
  
  componentDidUpdate() {
    this.scrollToCurrent();
  }
  
  onRoomChange(room, messages) {
    const messageList = this.state.messages;
    
    messageList.forEach((message) => {
      if (message.roomId.toString() === room.key) {
        messages.push(message)
      }
    })  
    
    return messages;
  }
  
  scrollToCurrent() {
    const room = this.props.room;
    if (room) {
      var messageList = document.getElementById('#messages');
      messageList.scrollTop = messageList.scrollHeight;
    }
    
  }
  
  sendMessage(message) {
    const user = this.props.user;
    
    if (user) {
      if (message !== '' ) {
        this.messagesRef.push({
          content: message,
          roomId: this.props.room.key,
          sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
          username: user.displayName
        });
        } else {
          alert("A message has not been typed.");
      }
    } else {
      alert("You need to be signed in to submit messages.");
    } 
  }
  
  
  
  

  render() {
    var messages = [];
    const room = this.props.room;
    const sendMessage = this.sendMessage;
    const user = this.props.user;
    this.onRoomChange(room, messages);

    
    if (room) {
      return (
        <div className="chat-room-container">
          <Header className="chat-room-header"><h1 style={{ color: 'rgba(0, 0, 0, 0.65)', textAlign: 'center', margin: 0 }}>{room.name}</h1></Header>
      
            <div id="#messages" className="chat-room-messages">
              <List
                  itemLayout="horizontal"
                  dataSource={messages}
                  renderItem={message => (
                    <Message 
                      message={message}
                      user={user} />
                  )}
                />
             </div>
            <Footer className="chat-room-footer">
              <CreateMessage
                className="message-form"
                room={room}
                sendMessage={sendMessage}
              />
            </Footer>
        </div>
      )
    } else {
      return (
         <div className="chat-room-container">
            <Header className="chat-room-header" style={{ background: 'none' }}>
              <h3 style={{ color: 'rgba(0, 0, 0, 0.45)', textAlign: 'center', margin: 0 }}>Select a Room</h3>
            </Header>
         </div>
     )
    }
     
  }
}    



export default MessageList;
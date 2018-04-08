import React, { Component } from 'react';
import CreateMessage from './CreateMessage.jsx';
import { Layout, List } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

const { Header, Content, Footer } = Layout;
const Item = List.Item;


class MessageList extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    
    this.messagesRef = this.props.firebase.database().ref('messages');
    this.sendMessage = this.sendMessage.bind(this);
    this.timestampFilter = this.timestampFilter.bind(this);
    this.onRoomChange = this.onRoomChange.bind(this);
  }

  componentDidMount() { 
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    });
    this.timestampFilter();
  }
  

  
  
  onRoomChange(room, messages) {
    const messageList = this.state.messages;
    
    messageList.forEach((message) => {
      if (message.roomId == room.key) {
        messages.push(message)
      }
    })  
    
    messages;
  }
  
  sendMessage(message) {
    if (message !== '') {
      this.messagesRef.push({
        content: message,
        roomId: this.props.room.key,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
        username: 'testUser'
      })
    }
  }
  
  timestampFilter(timestamp) {
    var currentTime = new Date();
    var timeSent = new Date(timestamp);
    var localTime = timeSent.toLocaleTimeString();
    var timeSentString = timeSent.toString();

    var yearSent = timeSent.getFullYear();
    var currentYear = currentTime.getFullYear();
    var month = timeSentString.slice(4,7);
    var date = timeSent.getDate();
    var day = timeSentString.slice(0,3);

    var time = '';
    var ampm = '';
    var timeDisplay = '';

    var minutesAgo = Math.floor((currentTime - timeSent) / 60000);

      if (localTime.length === 10) {
        time = localTime.slice(0,4);
        ampm = localTime.slice(7);
      } else {
        time = localTime.slice(0,5);
        ampm = localTime.slice(8);
      }

      if (minutesAgo < 1) {
        timeDisplay = 'Just now';
      } 
      else if (minutesAgo < 60) {
        timeDisplay = minutesAgo + ' min';
      } 
      else if (minutesAgo > 60 && minutesAgo < 10080) {
        timeDisplay = day + " " + time + ampm;
      } 
      else if (minutesAgo > 10080 && yearSent === currentYear){
        timeDisplay = month + " " + date + ", " + time + ampm;
      } else {
        timeDisplay = month + " " + date + ", " + yearSent;
      }

    return (timeDisplay);
  }
  

  render() {
    var messages = [];
    const room = this.props.room;
    const messageList = this.state.messages;
    const sendMessage = this.sendMessage;
    this.onRoomChange(room, messages);
    if (room) {
      return (
        <div className="chat-room-container">
          <Header className="chat-room-header"><h1 style={{ color: '#fff', textAlign: 'center', margin: 0 }}>{room.name}</h1></Header>
      
            <div className="chat-room-messages">
              <List
                  itemLayout="horizontal"
                  dataSource={messages}
                  renderItem={message => (
                    <Item key={message.key}>
                      <Item.Meta
                        title={message.username}
                        description={message.content}
                      />

                      <div>
                        {this.timestampFilter(message.sentAt)}
                      </div>
                    </Item>
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
              <h3 style={{ color: '#777', textAlign: 'center', margin: 0 }}>Select a Room</h3>
            </Header>
         </div>
     )
    }
     
    }
  }    



export default MessageList;
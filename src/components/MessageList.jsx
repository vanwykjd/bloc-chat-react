import React, { Component } from 'react';
import CreateMessage from './CreateMessage.jsx';
import { Layout, List } from 'antd';

const { Header, Footer } = Layout;
const Item = List.Item;

class MessageList extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    
    this.messagesOrderedRef = this.props.firebase.database().ref('messages').orderByChild('sentAt');
    this.messagesRef = this.props.firebase.database().ref('messages');
    this.sendMessage = this.sendMessage.bind(this);
    this.timestampFilter = this.timestampFilter.bind(this);
    this.onRoomChange = this.onRoomChange.bind(this);
    this.scrollToCurrent = this.scrollToCurrent.bind(this);
  }

  componentDidMount() { 
    this.messagesOrderedRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    });
    this.timestampFilter();
  }
  
  componentDidUpdate() {
    this.scrollToCurrent();
  }
  
  onRoomChange(room, messages) {
    const messageList = this.state.messages;
    
    messageList.forEach((message) => {
      if (message.roomId == room.key) {
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
    
    var timeSentLocal = timeSent.toLocaleTimeString();

     
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var days =["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    var yearSent = timeSent.getFullYear();
    var currentYear = currentTime.getFullYear();
    
    var monthSent = timeSent.getMonth();
    var currentMonth = currentTime.getMonth();
    
    var daySent = timeSent.getDay();
    
    var sentDate = timeSent.getDate();
    var currentDate = currentTime.getDate();
    
    var monthSentStr = months[monthSent];
    
    var daySentStr = days[daySent];
    
    var dateSentRef = new Date(Date.UTC(yearSent, monthSent, sentDate));
    var currentDateRef = new Date(Date.UTC(currentYear, currentMonth, currentDate));
    
    var daySentTS = dateSentRef.valueOf();
    var currentDayTS = currentDateRef.valueOf();
    
    
    var weekAgoRef = (currentDayTS - daySentTS) / 60000;
        
    var time = timeSentLocal.slice(0,4);
    var ampm = timeSentLocal.slice(7);
    var timeDisplay = '';

    var minutesAgo = Math.floor((currentTime - timeSent) / 60000);
       
     
      //Sent less than minute ago...
      if (minutesAgo < 1) {
        timeDisplay = 'Just now';
      }
      //Sent within an hour...
      else if (minutesAgo < 60) {
        timeDisplay = minutesAgo + ' min';
      }
      //Sent today...
      else if (daySentTS === currentDayTS) {
        timeDisplay = time + ampm;
      }
      //Sent within a week...
      else if (weekAgoRef < 10080) {
        timeDisplay = daySentStr + " " + time + ampm;
      }
      //Sent this year...
      else if (yearSent === currentYear) {
        timeDisplay = monthSentStr + " " + sentDate + ", " + time + ampm;
      //Sent a diff year...
      } else {
        timeDisplay = monthSentStr + " " + sentDate + ", " + yearSent;
      }
    
    return (timeDisplay);
    
  }
  

  render() {
    var messages = [];
    const room = this.props.room;
    const sendMessage = this.sendMessage;
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
              <h3 style={{ color: 'rgba(0, 0, 0, 0.45)', textAlign: 'center', margin: 0 }}>Select a Room</h3>
            </Header>
         </div>
     )
    }
     
    }
  }    



export default MessageList;
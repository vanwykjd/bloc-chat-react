import React, { Component } from 'react';
import { List } from 'antd';

const Item = List.Item;

class Message extends Component {
  constructor(props) {
    super(props);
    
    this.timestampFilter = this.timestampFilter.bind(this);
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
    const user = this.props.user;
    const message = this.props.message;
    
    if (user && (user.displayName === message.username)) {
      return (
        <Item key={message.key} style={{ borderLeft: "3px solid #1890ff", backgroundColor: "#e6f7ff" , paddingLeft: "22px", paddingRight: "24px" }} >
          <Item.Meta
            title={message.username}
            description={message.content}
          />

          <div>
            {this.timestampFilter(message.sentAt)}
          </div>
       
       </Item>
      )
    } else {
      return (
         <Item key={message.key} style={{  paddingLeft: "24px", paddingRight: "24px" }} >
          <Item.Meta
            title={message.username}
            description={message.content}
          />
          <div>
            {this.timestampFilter(message.sentAt)}
          </div>
       </Item>
      )
    }
  }
}

export default Message;
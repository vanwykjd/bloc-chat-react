import React, { Component } from 'react';
import { Form, Icon, Input } from 'antd';

const FormItem = Form.Item;


class CreateMessage extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      currentRoom: ''
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.handleRoomChange = this.handleRoomChange.bind(this);
  }
  
  
  componentDidUpdate() {
    const room = this.props.room;
    this.handleRoomChange(room);
  }
  
  clearInput() {
    this.setState({ content: '' });
  }
  
  handleChange(e) {
    const value = e.target.value;
    this.setState({
      content: value
    })
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.props.sendMessage(this.state.content);
    this.clearInput();
  }
  
  handleRoomChange(room) {
    const currentRoom = this.state.currentRoom;
    if (room !== currentRoom ) {
      this.setState({
        currentRoom: room,
        content: ''
      })
    }
    
  }
  
  render() {
    const content = this.state.content;
    
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem className="message-form">
            <Input
              placeholder="Send a Message"
              suffix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />}
              value={content}
              onChange={this.handleChange}
            />
          </FormItem>
        </Form>
      )
  } 
}

export default CreateMessage;
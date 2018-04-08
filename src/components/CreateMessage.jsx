import React, { Component } from 'react';
import { Form, Icon, Input } from 'antd';

const FormItem = Form.Item;


class CreateMessage extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearInput = this.clearInput.bind(this);
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
  
  handleRoomChange(room) {
    const currentRoom = this.props.room;
    
    if (room !== currentRoom) {
      this.clearInput();
    }
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.props.sendMessage(this.state.content);
    this.clearInput();
  }
  
  
  render() {
    const content = this.state.content;
    const room = this.props.room;
    
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
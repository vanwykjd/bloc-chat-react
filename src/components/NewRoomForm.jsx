import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

class NewRoomForm extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      room: '',
      visible: true,
    };
    
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  toggleVisibility() {
    if (this.state.visible) {
      this.setState({
        visible: false
      })
    } else {
      this.setState({
        room: '',
        visible: true
      })
    }
	}
  
  handleChange(e) {
    const value = e.target.value;
    this.setState({
      room: value
    })
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.props.createRoom(this.state.room);
    this.toggleVisibility();
  }
  
  render() {
    const room = this.state.room;
    const toggle =  this.toggleVisibility;
    
    if (this.state.visible) {
      return (
        <li className='ant-menu-item'>
          <Button id='#add-rm-btn' type="dashed" onClick={toggle} style={{ width: '100%' }}>
            <Icon type="plus" /><span style={{ paddingRight: '20px' }}>Add Room</span>
          </Button>
        </li>
      )
    }

    return (
      <li className='ant-menu-item' onBlur={toggle}>
        <Form id='#add-rm-form' onSubmit={this.handleSubmit} autoFocus>
           <FormItem>
              <Input type="text" value={room} onChange={this.handleChange} placeholder='Create New Room' autoFocus/>
           </FormItem>
        </Form>
      </li>
    )
  }
}

export default NewRoomForm;
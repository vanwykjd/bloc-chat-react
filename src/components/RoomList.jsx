import React, { Component } from 'react';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

class RoomList extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    };
    
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }
  
  
  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }
  
  render() {
     const rooms = this.state.rooms;
    
     return (
       <div className="wrapper">
       <div className="room-list-container">
          <Menu mode="inline">
            <SubMenu key="Room List" title={<span><Icon type="bars" /><span>Rooms</span></span>}>
              { rooms.map( (room, key) =>
                 <Menu.Item key={key}>{room.name}</Menu.Item>
              )}
            </SubMenu>
          </Menu>
        </div>
        </div>
    );
  }
}

export default RoomList;
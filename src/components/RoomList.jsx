import React, { Component } from 'react';
import CreateRoom from './CreateRoom.jsx';
import { Menu, Icon } from 'antd';


const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

class RoomList extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    };
    
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.createRoom = this.createRoom.bind(this);
    this.selectRoom = this.selectRoom.bind(this);

  }
  
  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }
  
  createRoom(room) {
    if (room !== '') {
      this.roomsRef.push({
        name: room
      })
    }
  }
  
  selectRoom(room) {
    this.props.setRoom(room);
  }
  
  
  render() {
     const rooms = this.state.rooms;
     const createRoom = this.createRoom;
    
     return (
       <div>
          <Menu mode="inline">
            <SubMenu key="Room List" title={<span><Icon type="bars" /><span>Rooms</span></span>}>
              { rooms.map( (room) =>
                 <Item key={room.key}>
                    <div onClick={() => this.selectRoom(room)}>
                      {room.name}
                    </div>
                  </Item>
              )}
              <CreateRoom
                createRoom = {createRoom}
              />
            </SubMenu>
          </Menu>
      
       </div>
  
    );
  }
}

export default RoomList;
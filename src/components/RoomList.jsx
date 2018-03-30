import React, { Component } from 'react';
import NewRoomForm from './NewRoomForm.jsx';
import { Layout, Menu, Icon } from 'antd';


const SubMenu = Menu.SubMenu;
const { Sider } = Layout;

class RoomList extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
    };
    
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.createRoom = this.createRoom.bind(this);
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
  
  render() {
     const rooms = this.state.rooms;
     const createRoom = this.createRoom;
    
     return (
       <Sider className='side-nav'>
          <Menu mode="inline">
            <SubMenu key="Room List" title={<span><Icon type="bars" /><span>Rooms</span></span>}>
              { rooms.map( (room, key) =>
                 <Menu.Item key={key}>{room.name}</Menu.Item>
              )}
              <NewRoomForm
                createRoom = {createRoom}
              />
            </SubMenu>
            
          </Menu>
      
       </Sider>
  
    );
  }
}

export default RoomList;
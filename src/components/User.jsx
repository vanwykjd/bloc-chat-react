import React, { Component } from 'react';
import { Button, Menu, Icon } from 'antd';
import ErrorModal from './ErrorModal.jsx';

const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

class User extends Component {
  constructor(props) {
    super(props);  
    this.state  = {
      hasError: false
    }
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleError = this.handleError.bind(this);
  }
  
  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  };
  
  handleSignIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider).catch( error => {
      const errorCode = error.code;
      if (errorCode === "auth/web-storage-unsupported") {
        this.setState({ hasError: true });
      }
    });
  }
  
  handleSignOut() {
    this.props.firebase.auth().signOut();
    window.location.reload();
  }
  
  handleError() {
    this.setState({ hasError: false });
    window.location.reload();
  }
  
  render() {
    const user = this.props.user;
    
    if (user) {
      return(
        <div>
          <Menu mode="vertical" triggerSubMenuAction="click">
            <SubMenu key="UserName" title={<span style={{ fontWeight: "bold", lineHeight: "1.5px" }}><Icon type="user" /><span>{user.displayName}</span></span>}>
              <Item>
                <div onClick={this.handleSignOut}>
                  Sign out
                </div>
              </Item>
            </SubMenu>
          </Menu>
        </div>
      )
    }
    return (
      <div>
        <div className="user-menu">
          <Button style={{ paddingLeft: "12px", paddingRight: "12px", width: "100%"}} onClick={this.handleSignIn} type="primary"><span><Icon type="google" style={{ marginRight: "12px" }}/><span>Sign in with Google</span></span></Button>
        </div>
        <ErrorModal
          hasError={this.state.hasError}
          handleError={this.handleError} />
      </div>
    )
  }
}

export default User;
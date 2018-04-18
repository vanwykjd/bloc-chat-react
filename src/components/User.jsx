import React, { Component } from 'react';
import { Modal, Button, Menu, Icon, List, Card } from 'antd';
import Step1 from '../images/Step1.png'
import Step2 from '../images/Step2.png'
import Step3 from '../images/Step3.png'
import Step4 from '../images/Step4.png'
import Step5 from '../images/Step5.png'
import Step6 from '../images/Step6.png'
import Step7 from '../images/Step7.png'


const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

class User extends Component {
  constructor(props) {
    super(props);  
    this.state  = {
      error: false
    }
    this.userSignIn = this.userSignIn.bind(this);
    this.userSignOut = this.userSignOut.bind(this);
    this.handleError = this.handleError.bind(this);
    this.userStatus = this.userStatus.bind(this);
  }
  
  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  };
  
  
  UserSignedIn(props) {
    const user = props.user;
    
    return (
      <div>
        <SubMenu key="UserName" title={<span><Icon type="user" /><span>{user.displayName}</span></span>}>
          <Item>
            <div onClick={this.userSignOut}>
              Sign Out
            </div>
          </Item>
        </SubMenu>
      </div>
    )
  }
    return (
      <div className="sign-in">
        <Button onClick={this.userSignIn} icon="google" style={{ width: "100%" }}>Sign in with Google</Button>
      </div>
    )
    console.log(user);
  }
  
  userSignIn() {
    const base = this;
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider).catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      if (errorCode === "auth/web-storage-unsupported") {
        base.setState({ error: true });
        console.log("error");
      }
    });
  }
  
  userSignOut() {
    this.props.firebase.auth().signOut();
  }
  
  handleError() {
    this.setState({ error: false });
    window.location.reload();
  }
  
  render() {
    const user = this.props.user;
    
     return (
      <div>
      <Menu mode="horizontal" className="user-menu">
       {this.userStatus()}
      </Menu>
        
        <Modal
        visible={this.state.error}
        onCancel={this.handleError}
        footer={[<Button key="okay" type="primary" onClick={this.handleError}>Okay</Button>]}>
          <List
            size="small">
              <List.Item>
                Click "Chrome" at top of screen...
              </List.Item>
              <List.Item>
                <Card style={{ width: "100%" }}>
                  <img alt="step1" src={Step1} style={{ width: "100%" }} />
                </Card>
              </List.Item>
              <List.Item>
                Select "Preferences..."
              </List.Item>
              <List.Item>
                <Card style={{ width: "100%" }}>
                  <img alt="step2" src={Step2} style={{ width: "100%" }} />
                </Card>
              </List.Item>
              <List.Item>
                Scroll down until you see "Advanced", then select...
              </List.Item>
              <List.Item>
                <Card style={{ width: "100%" }}>
                  <img alt="step3" src={Step3} style={{ width: "100%" }} />
                </Card>
              </List.Item>
              <List.Item>
                Under "Privacy and security", select "Content settings"...
              </List.Item>
              <List.Item>
                <Card style={{ width: "100%" }}>
                  <img alt="step4" src={Step4} style={{ width: "100%" }} />
                </Card>
              </List.Item>
              <List.Item>
                Within the "Content settings", select "Cookies"...
              </List.Item>
              <List.Item>
                <Card style={{ width: "100%" }}>
                  <img alt="step5" src={Step5} style={{ width: "100%" }} />
                </Card>
              </List.Item>
              <List.Item>
                Under "Cookies", click the "ADD" button next to "Allow" option...
              </List.Item>
              <List.Item>
                <Card style={{ width: "100%" }}>
                  <img alt="step6" src={Step6} style={{ width: "100%" }} />
                </Card>
              </List.Item>
              <List.Item>
                Type "react-bloc-chat-32b88.firebaseapp.com", then click "ADD"...
              </List.Item>
              <List.Item>
                <Card style={{ width: "100%" }}>
                  <img alt="step7" src={Step7} style={{ width: "100%" }} />
                </Card>
              </List.Item>
              <List.Item>
                Once finished, click "Okay" below.
              </List.Item>
          </List>
        </Modal>
      </div>
    )}
}

export default User;
import React, { Component } from 'react';
import { Modal, Button, List, Card, Alert } from 'antd';
import Step1 from '../images/Step1.png'
import Step2 from '../images/Step2.png'
import Step3 from '../images/Step3.png'
import Step4 from '../images/Step4.png'
import Step5 from '../images/Step5.png'
import Step6 from '../images/Step6.png'
import Step7 from '../images/Step7.png';

const Item = List.Item;

class ErrorModal extends Component {
  
  render() {
    
    return (
      <Modal
        visible={this.props.hasError}
        onCancel={this.props.handleError}
        footer={[<Button key="okay" type="primary" onClick={this.props.handleError}>Okay</Button>]}
        style={{ minWidth: "600px"}} >
        
          <div>
            <Alert message="Error: auth/web-storage-unsupported" type="error"  style={{ marginTop: "24px"}}/>
          </div>

            <List size="medium" header={<h3>To enable this feature, do the following...</h3>}>
                <Item>
                  <Card style={{ width: "100%" }}>
                    <h4>Click "Chrome" at top of screen...</h4>
                    <img alt="step1" src={Step1} style={{ width: "100%" }} />
                  </Card>
                </Item>

                <Item>
                  <Card style={{ width: "100%" }}>
                    <h4>Select "Preferences..."</h4>
                    <img alt="step2" src={Step2} style={{ width: "100%" }} />
                  </Card>
                </Item>

                <Item>
                  <Card style={{ width: "100%" }}>
                    <h4>Scroll down until you see "Advanced", then select...</h4>
                    <img alt="step3" src={Step3} style={{ width: "100%" }} />
                  </Card>
                </Item>

                <Item>
                  <Card style={{ width: "100%" }}>
                    <h4>Under "Privacy and security", select "Content settings"...</h4>
                    <img alt="step4" src={Step4} style={{ width: "100%" }} />
                  </Card>
                </Item>

                <Item>
                  <Card style={{ width: "100%" }}>
                    <h4>Within the "Content settings", select "Cookies"...</h4>
                    <img alt="step5" src={Step5} style={{ width: "100%" }} />
                  </Card>
                </Item>

                <Item>
                  <Card style={{ width: "100%" }}>
                    <h4>Under "Cookies", click the "ADD" button next to "Allow" option...</h4>
                    <img alt="step6" src={Step6} style={{ width: "100%" }} />
                  </Card>
                </Item>

                <Item>
                  <Card style={{ width: "100%" }}>
                    <h4>Type "react-bloc-chat-32b88.firebaseapp.com", then click "ADD"...</h4>
                    <img alt="step7" src={Step7} style={{ width: "100%" }} />
                  </Card>
                </Item>
                <Item>
                   <Card style={{ width: "100%" }}>
                    <h4>Once finished, click "Okay" below.</h4>
                  </Card>
                </Item>
            </List>
        </Modal>
    );
  }
}

export default ErrorModal;
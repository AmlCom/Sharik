import React, {Component} from 'react'
import {render} from 'react-dom'
import {Launcher} from 'react-chat-window'
import axios from 'axios'
 
class Message extends Component {
 
  constructor() {
    super();
    this.state = {
    //  messageList: messageHistory
    messageList:[]
    };
  }

  componentDidMount() {
    axios.get('/auth/checkLogging').
    then((res) => {
        console.log('response',res.data)
    })
    .catch((err) => {
        console.log(err)
    })

    
    
    axios.post('/message/allmessages',this.props.location.state.detail)
    .then((res) => {
        console.log('all messages',res)
        this.setState({
            messageList:res.data.messagesTeacherStudent
        })
    })
    .catch((err) => {
        console.log(err)
    })

  }
 
  _onMessageWasSent(message) {
      console.log('message',message.data.text)
      console.log('array',this.state.messageList)
    //   this.state.messageList.push(message)
      this.props.location.state.detail['message'] = message.data.text
      axios.post('/message/message',this.props.location.state.detail)
      .then((res) => {
          console.log('yahyrees',res)

          axios.post('/message/allmessages',this.props.location.state.detail)
          .then((res) => {
              console.log('all messages',res)
              this.setState({
                  messageList:res.data.messagesTeacherStudent
              })
          })
          .catch((err) => {
              console.log(err)
          })
      })
      .catch((err) => {
          console.log(err)
      })




    this.setState({
      messageList: [...this.state.messageList, message]
    })
    console.log('yyyy',this.state.messageList)
  }
 
  _sendMessage(text) {
      console.log('mmmm',text)
      console.log('yyyy',this.state.messageList)
    // if (text.length > 0) {
    //   this.setState({
    //     messageList: [...this.state.messageList, {
    //       author: 'them',
    //       type: 'text',
    //       data: { text }
    //     }]
    //   })
    // }
  }
 
  render() {
      console.log('you receivedthem',this.props.location.state.detail)
      console.log('jjjj',this.state.messageList)
    return (<div>
      <Launcher
        agentProfile={{
          teamName: 'Sharik-Live-Chat',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        messageList={this.state.messageList}
        showEmoji
      />
    </div>)
  }
}

export default Message;
import React from 'react'
import Chatkit from '@pusher/chatkit'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'

import { tokenUrl, instanceLocator } from './config'

class App extends React.Component {

    constructor(){
      super()
      this.state = {
        messages: []
      }
    }
    
    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator,
            userId: 'eida',
            tokenProvider: new Chatkit.TokenProvider({
                url: tokenUrl
            })
        })
        
        chatManager.connect()
        .then(currentUser => {
          this.currentUser = currentUser
          this.currentUser.subscribeToRoom({
                roomId: 14472165,
                hooks: {
                    onNewMessage: message => {
                        this.setState({
                          messages: [...this.state.messages, message]
                        })
                    }
                }
            })
        })
    }

    sendMessage = (text) => {
      this.currentUser.sendMessage({
        text,
        roomId: 14472165
      })
    }
    
    render() {
        return (
            <div className="app">
                <RoomList />
                <MessageList messages={this.state.messages} />
                <SendMessageForm  sendMessage={this.sendMessage} />
                <NewRoomForm />
            </div>
        );
    }
}

export default App
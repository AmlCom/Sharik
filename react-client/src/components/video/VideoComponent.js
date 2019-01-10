import React, { Component } from "react";
import axios from "axios";
import Video from "twilio-video";
import Nav from '../Nav'
import '../App/App.css';
import {render} from 'react-dom'
import {Launcher} from 'react-chat-window'


export default class VideoComponent extends Component {
    constructor(props) {
        super(props);
        this.activeRoom = null;
        this.previewTracks = null;
        this.identity = null;
        this.roomName = null;
        this.roomJoined = this.roomJoined.bind(this);
        this.state = {
            messageList:[]
        }
        
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

        window.addEventListener("beforeunload", this.leaveRoomIfJoined);
        this.refs.buttonPreview.onclick = ()=> {
            var localTracksPromise = this.previewTracks
                ? Promise.resolve(this.previewTracks)
                : Video.createLocalTracks();

            localTracksPromise.then(
                (tracks)=> {
                    window.previewTracks = this.previewTracks = tracks;
                    var previewContainer = document.getElementById("local-media");
                    if (!previewContainer.querySelector("video")) {
                        this.attachTracks(tracks, previewContainer);
                    }
                },
                (error)=> {
                    this.log("Unable to access Camera and Microphon");
                }
            );
        };

        axios.get("/token").then(results => {
            this.identity = results.data.identity;
            this.refs.roomControls.style.display = "block";

            // Bind button to join Room.
            this.refs.buttonJoin.onclick = ()=>{
                this.roomName = this.refs.roomName.value;
                if (!this.roomName) {
                    alert("Please enter a room name.");
                    return;
                }

                this.log("Joining room '" + this.roomName + "'...");
                var connectOptions = {
                    name: this.roomName,
                    logLevel: "debug"
                };

                if (this.previewTracks) {
                    connectOptions.tracks = this.previewTracks;
                }

                // Join the Room with the token from the server and the
                // LocalParticipant's Tracks.
                Video.connect(results.data.token, connectOptions).then(this.roomJoined, (error)=> {
                    this.log("Could not connect to Twilio: " + error.message);
                });
            };

            // Bind button to leave Room.
            this.refs.buttonLeave.onclick = ()=> {
                this.log("Leaving room...");
                this.activeRoom.disconnect();
            };
        });
    }

    attachTracks(tracks, container) {
        tracks.forEach((track)=> {
            container.appendChild(track.attach());
        });
    }

    attachParticipantTracks(participant, container) {
        var tracks = Array.from(participant.tracks.values());
        this.attachTracks(tracks, container);
    }
    

    detachTracks(tracks) {
        tracks.forEach((track)=> {
            track.detach().forEach((detachedElement)=> {
                detachedElement.remove();
            });
        });
    }

    detachParticipantTracks(participant) {
        var tracks = Array.from(participant.tracks.values());
        this.detachTracks(tracks);
    }

    log(message) {
        var logDiv = this.refs.log;
        logDiv.innerHTML += "<p>&gt;&nbsp;" + message + "</p>";
        logDiv.scrollTop = logDiv.scrollHeight;
    }


    roomJoined(room) {
        this.activeRoom = room;
        window.room = room.name;

        this.log("Joined as '" + this.identity + "'");
        this.refs.buttonJoin.style.display = "none";
        this.refs.buttonLeave.style.display = "inline";

        // Attach LocalParticipant's Tracks, if not already attached.
        var previewContainer = this.refs.localMedia;
        if (!previewContainer.querySelector("video")) {
            this.attachParticipantTracks(room.localParticipant, previewContainer);
        }

        // Attach the Tracks of the Room's Participants.
        room.participants.forEach((participant)=> {
            this.log("Already in Room: '" + participant.identity + "'");
            var previewContainer = document.getElementById("remote-media");
            this.attachParticipantTracks(participant, previewContainer);
        });

        // When a Participant joins the Room, log the event.
        room.on("participantConnected", (participant)=> {
            this.log("Joining: '" + participant.identity + "'");
        });

        // When a Participant adds a Track, attach it to the DOM.
        room.on("trackAdded", (track, participant)=> {
            this.log(participant.identity + " added track: " + track.kind);
            var previewContainer = document.getElementById("remote-media");
            this.attachTracks([track], previewContainer);
        });

        // When a Participant removes a Track, detach it from the DOM.
        room.on("trackRemoved", (track, participant)=> {
            this.log(participant.identity + " removed track: " + track.kind);
            this.detachTracks([track]);
        });

        // When a Participant leaves the Room, detach its Tracks.
        room.on("participantDisconnected", (participant)=> {
            this.log("Participant '" + participant.identity + "' left the room");
            this.detachParticipantTracks(participant);
        });

        // Once the LocalParticipant leaves the room, detach the Tracks
        // of all Participants, including that of the LocalParticipant.
        room.on("disconnected", ()=> {
            this.log("Left");
            if (this.previewTracks) {
                this.previewTracks.forEach((track)=> {
                    track.stop();
                });
            }
            this.detachParticipantTracks(room.localParticipant);
            room.participants.forEach(this.detachParticipantTracks);
            this.activeRoom = null;
            this.refs.buttonJoin.style.display = "inline";
            document.getElementById("button-leave").style.display = "none";
        });
    }

    leaveRoomIfJoined() {
        if (this.activeRoom) {
            this.activeRoom.disconnect();
        }
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
        console.log('state',this.activeRoom)
        
        return (
            <div>
                <div style={{ height: '100%' }}>
                        <Nav />
                    </div>
                    
                <div id="remote-media"></div>
                <div className='VideoChat' id="controls">
                    <div id="preview">
                        <p className="instructions">Video Call</p>
                        <div ref="localMedia" id="local-media"></div>
                        <button  ref="buttonPreview" id="button-preview">Preview Your Camera</button>
                    </div>
                    <div ref="roomControls">
                        <p className="instructions">Room Name:</p>
                        <input ref="roomName" id="room-name" type="text" value = 'room1' placeholder="Enter a room name"  />
                        <button ref="buttonJoin" id="button-join">Call</button>
                        <button ref="buttonLeave" id="button-leave">Cancel</button>
                    </div>
                    <div ref="log" id="log"></div>
                </div>
                <div>
      <Launcher
        agentProfile={{
          teamName: 'Sharik-Live-Chat',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        messageList={this.state.messageList}
        showEmoji
      />
    </div>
            </div>
        );
    }
}



// import React, {Component} from 'react'
// import {render} from 'react-dom'
// import {Launcher} from 'react-chat-window'
// import axios from 'axios'
 
// class Message extends Component {
 
//   constructor() {
//     super();
//     this.state = {
//     //  messageList: messageHistory
//     messageList:[]
//     };
//   }

//   componentDidMount() {
//     axios.get('/auth/checkLogging').
//     then((res) => {
//         console.log('response',res.data)
//     })
//     .catch((err) => {
//         console.log(err)
//     })

    
    
//     axios.post('/message/allmessages',this.props.location.state.detail)
//     .then((res) => {
//         console.log('all messages',res)
//         this.setState({
//             messageList:res.data.messagesTeacherStudent
//         })
//     })
//     .catch((err) => {
//         console.log(err)
//     })

//   }
 
//   _onMessageWasSent(message) {
//       console.log('message',message.data.text)
//       console.log('array',this.state.messageList)
//     //   this.state.messageList.push(message)
//       this.props.location.state.detail['message'] = message.data.text
//       axios.post('/message/message',this.props.location.state.detail)
//       .then((res) => {
//           console.log('yahyrees',res)

//           axios.post('/message/allmessages',this.props.location.state.detail)
//           .then((res) => {
//               console.log('all messages',res)
//               this.setState({
//                   messageList:res.data.messagesTeacherStudent
//               })
//           })
//           .catch((err) => {
//               console.log(err)
//           })
//       })
//       .catch((err) => {
//           console.log(err)
//       })




//     this.setState({
//       messageList: [...this.state.messageList, message]
//     })
//     console.log('yyyy',this.state.messageList)
//   }
 
//   _sendMessage(text) {
//       console.log('mmmm',text)
//       console.log('yyyy',this.state.messageList)
//     // if (text.length > 0) {
//     //   this.setState({
//     //     messageList: [...this.state.messageList, {
//     //       author: 'them',
//     //       type: 'text',
//     //       data: { text }
//     //     }]
//     //   })
//     // }
//   }
 
//   render() {
//       console.log('you receivedthem',this.props.location.state.detail)
//       console.log('jjjj',this.state.messageList)
//     return (<div>
//       <Launcher
//         agentProfile={{
//           teamName: 'Sharik-Live-Chat',
//           imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
//         }}
//         onMessageWasSent={this._onMessageWasSent.bind(this)}
//         messageList={this.state.messageList}
//         showEmoji
//       />
//     </div>)
//   }
// }

// export default Message;
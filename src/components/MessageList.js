import React, {Component} from 'react';
import './MessageList.css';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      content: '',
      sentAt: '',
      roomId: '',
      messages:[],
      displayMessages: [],
      newMessage:''
    };

    this.messagesRef = this.props.firebase.database().ref('messages');
  }





  componentWillReceiveProps(nextProps){
    this.updateDisplayMessages(nextProps.activeRoom);
  }

  createMessage(newMessage) {
    console.log(this.props.activeRoom)
    if(!this.props.activeRoom || !newMessage) { return }
    this.messagesRef.push({
      content: newMessage,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom,
      username: this.props.user ? this.props.user.displayName : 'Guest'
    })
    this.setState({ newMessage: '' });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({newMessage: e.target.value});
  }

  updateDisplayMessages(activeRoom){
    if(!activeRoom) {return}
    this.setState({ displayMessages: this.state.messages.filter(message => message.roomId.name  === this.props.activeRoom.name)})
  //  console.log(activeRoom)
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message )}, ()=>{
        this.updateDisplayMessages( this.props.activeRoom )});
        console.log(this.state.messages);
    });
  }
/*  watchForNewMessages() {
    this.messagesRef.on ( 'child_added', snapshot =>{
      const message = Object.assign( snapshot.val(), { key: snapshot.key } )
      this.setState( { messages: this.state.messages.concat( message ) }, () => {
        this.updateDisplayMessages( this.props.activeRoom)
    });
    });
  }*/



  render() {
    return (
      <main id="messages">
      <h2 className="room-name">{this.props.activeRoom ? this.props.activeRoom.name : ''}</h2>
      <ul className="message-list">
        {this.state.displayMessages.map( message =>

            <li key={message.key}>
            <div> {message.content} </div>
            <div> {message.username} </div>
            <div> {new Date(message.sentAt).toString()} </div>
            </li>
        )}
      </ul>
      <form id="create-message" onSubmit={ (e) => { e.preventDefault(); this.createMessage(this.state.newMessage, this.props.activeRoom ) } }>
        <input type="text" value={ this.state.newMessage } placeholder="Message" onChange= { this.handleChange.bind(this) } />
        <input type="submit" value="Send" />
      </form>
      </main>
    );
  }

}

export default MessageList;

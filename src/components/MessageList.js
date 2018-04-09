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

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      console.log("Message:");
      console.log(message);
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message )}, ()=>{
        this.updateDisplayMessages( this.props.activeRoom )});
        console.log(this.state.messages);
    });
    this.messagesRef.on('child_removed', snapshot => {
      this.setState({ messages: this.state.messages.filter( message => message.key !== snapshot.key )}, () => {
        this.updateDisplayMessages( this.props.activeRoom )
      });
    })
  }

  componentWillReceiveProps(nextProps){
    console.log("message")
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
    this.setState({ displayMessages: this.state.messages.filter(message => message.roomId.name === activeRoom.name)})
  //  console.log(activeRoom)
  }

  deleteMessage(room) {
    this.messagesRef.child(room.key).remove();
  }

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
            <button className="delete-message" onClick={ () => this.deleteMessage(message)}>Delete</button>
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

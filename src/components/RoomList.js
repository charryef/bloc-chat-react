import React, {Component} from 'react';
import './RoomList.css'

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state  = {
      rooms: [],
      newRoomName: ''
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');

  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room )});
    });
  }


  createRoom(newRoomName) {
    if (!this.props.user || !newRoomName) { return }
    this.roomsRef.push({
      name: newRoomName,
    });
    this.setState({newRoomName:''});
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ newRoomName: e.target.value });
  }

  setRoom(room) {
    this.setState({ activeRoom: room });
  }


  render(){
    return (
      <section className ="sidenav">
        <h1>Bloc Chat</h1>
        <form id="create-room" onSubmit={ (e) => { e.preventDefault(); this.createRoom(this.state.newRoomName) } }>
          <input type="text" value={ this.state.newRoomName } placeholder="Create a new room" onChange={ this.handleChange.bind(this) } name="newRoomName"/>
          <input type="submit" value ="+" />
        </form>
        <ul className="room-list">
          {this.state.rooms.map( (room,index) => (
            <li key={index} onClick={() => {this.props.setRoom(room)}}>{ room.name }</li>
            ),
          )}
        </ul>

      </section>
    );
  }
}

export default RoomList;

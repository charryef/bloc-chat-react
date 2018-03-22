import React, {Component} from 'react';


class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state  = {
      rooms: [],
      newRoomName: ''
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');

  }

  createRoom(newRoomName) {
    this.roomsRef.push({
      name: newRoomName
    });
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value });
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room )});
    });
  }

  render(){
    return (
      <div className ="Room-list">
        <ul>
        {this.state.rooms.map((room, index) =>
          <li key={index}>{room.name}</li>
        )}
        </ul>
        <form onSubmit={ (e) => { e.preventDefault(); this.createRoom(this.state.newRoomName) } }>
          <input type="text" value={ this.state.newRoomName } onChange={ (e) => { this.handleChange(e) } } name="newRoomName"/>
          <input type="submit"  />
        </form>
      </div>
    );
  }
}

export default RoomList;

import React, {Component} from 'react';

//create a RoomList component, which will be rendered from App.js,
//and firebase will be passed down to it as a prop
class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state  = {
      rooms: []
    };

    //store a Firebase reference to the rooms path onto the this keyword.
    this.roomsRef = this.props.firebase.database().ref('rooms');
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
      <div>
        <ul className = "room-list">
        {this.state.rooms.map((room, index) =>
          <li key={index}>{room.name}</li>
        )}
        </ul>
      </div>
    );
  }
}

export default RoomList;

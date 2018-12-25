import React, { Component } from 'react';

class  Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedin: false
        }
    }
    render() {
        return (
            <div>
            <h1>This is the Profile page </h1>
            {/* <p>{this.props.location.state.referrer}</p> */}
            </div>
        )
    }
}

export default Profile;
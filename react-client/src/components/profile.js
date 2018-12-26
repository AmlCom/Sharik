import React, { Component } from 'react';
import { storage } from '../firebase/index'


class Profile extends Component {
    constructor(props) {
        super(props)
        this.state={
            image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNimrjRZN3jIxU-D90rCnZ6pZvp9QF4t55QWP6PdOrCcyWpsvT"
        }
    }


    uploadImage = (e) => {
        //console.log('image',e.target.files[0]);
        this.setState({
            image: e.target.files[0]
        })
    }
    submitImage = () => {
        var image = this.state.image
    const uploadTask = storage.ref(`images/${image.name}`).put(image)
    uploadTask.on('state_changed', (snapshot) => {

}, (error) => {
    console.log(error)
}, () => {
    storage.ref('images').child(image.name).getDownloadURL().then(url => {
        console.log('url',url)
        this.setState({
          image:url
        })
     //request to the database update the profile picture
    })
});


    }


    render(){
        console.log('state',this.state.image)
    return (

        <div className="container">
            <div className="row">
                <div className="col-md-3"  >


                <img src={this.state.image} alt="" className="rounded"/>
                <br />
                <br />
                <input  type='file' onChange = {this.uploadImage}/><br></br>
                   <button onClick={this.submitImage}>Upload</button>
                    <div className="list-group">
                        <a href="" className="list-group-item active main-color-bg">
                            <span className="glyphicon glyphicon-cog" aria-hidden="true"></span> The Name of the user
                        </a>
                        <a href="" className="list-group-item"><span className="glyphicon glyphicon-list-alt" aria-hidden="true"></span> Messages <span className="badge">12</span></a>
                        <a href="" className="list-group-item"><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> Comments <span className="badge">33</span></a>
                        <a href="" className="list-group-item"><span className="glyphicon glyphicon-user" aria-hidden="true"></span> SOMETHING <span className="badge">203</span></a>
                    </div>



             </div>
                <div className="col-md-9">
                    <div className="panel panel-default">
                        <div className="panel-heading ">
                            <h3 className="panel-title border border-success">Your requests</h3>
                        </div>
                        <div className="panel-body">
                            <div className="row">

                            </div>
                            <br />
                            <table className="table table-striped table-hover">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th></th>
                                </tr>
                                <tr>
                                    <td>Name 1</td>
                                    <td>@gmail.com</td>
                                    <td><a className="btn btn-success" href="">Accept</a> <a className="btn btn-danger" href="#">Reject</a></td>
                                </tr>
                                <tr>
                                    <td>Name 2</td>
                                    <td>@yahoo.com</td>
                                    <td><a className="btn btn-success" href="">Accept</a> <a className="btn btn-danger" href="#">Reject</a></td>
                                </tr>
                                <tr>
                                    <td>Name 3</td>
                                    <td>@yahoo.com</td>
                                    <td><a className="btn btn-success" href="">Accept</a> <a className="btn btn-danger" href="#">Reject</a></td>
                                </tr>
                                <tr>
                                    <td>Name 4</td>
                                    <td>@gmail.com</td>
                                    <td><a className="btn btn-success" href="">Accept</a> <a className="btn btn-danger" href="#">Reject</a></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
}

export default Profile;
import React, { Component } from 'react';
import { storage } from '../firebase/index'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './Profile.css'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Loggedin: false,
            image: "",
            teacherName: "",
            teacherMajor: "",
            info: "",
            price: ""
        }
    }
    
    componentDidMount() {
        axios.get('/auth/checkLogging').
        then((x) => {
            console.log('356', x.data);
            if (x.data) {
              console.log('dfgfcvm')
                this.setState({
                   Loggedin: true
                })
            } else {
               this.setState({
                   Loggedin: false
               })
            }
        })
      }

    // componentDidMount() {
    //     axios.get('/teacher').then((res) => {
    //         console.log("res", res);
    //         this.setState({
    //             image: res.data[0].image,
    //             teacherName: res.data[0].teacherName,
    //             teacherMajor: res.data[0].teacherMajor,
    //             info: res.data[0].info,
    //             price: res.data[0].price
    //         })

    //     }).catch((err) => {
    //         console.log('hi', err)
    //     })

    // }


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
                console.log('url', url)
                this.setState({
                    image: url
                })
                //request to the database update the profile picture
            })
        });
    }
// }, (error) => {
//     console.log(error)
// }, () => {
//     storage.ref('images').child(image.name).getDownloadURL().then(url => {
//         console.log('url',url)
//         this.setState({
//           image:url
//         })
//      //request to the database update the profile picture
//     })
// });


//     }


    render(){
        {console.log('43', this.state.Loggedin)}
        if (!this.state.Loggedin) {
            return (
                <div>
                    <h1>This is the Signin page </h1>
                    <form action="/login" method="post">
                        <div>
                            <label>Email address:</label>
                            <input type="text" name="email" onChange={this.handleChange}/>
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" name="password" onChange={this.handleChange}/>
                        </div>
                        <div>
                            <input type="submit" value="Log In" onClick={this.handleSubmit}/>
                        </div>
                    </form>
                    <a href="/auth/google" ><button className={'btn btn-success'}>Sign In with Google</button></a>
                    <a href="/auth/facebook" ><button className={'btn btn-danger'}>Sign In with Facebook</button></a>
                </div>
            )
        } else {
        console.log('state',this.state.image)
    return (

            <div className="container">
                <div className="row">
                    <div className="pic col-md-3"  >


                        <img src={this.state.image} alt="" className="rounded" />
                        <br />
                        <br />

                        <div className="input-group mb-3">
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="inputGroupFile02" onChange={this.uploadImage} />
                                <label className="custom-file-label" for="inputGroupFile02" aria-describedby="inputGroupFileAddon02">Choose file</label>
                            </div>
                            <div className="input-group-append">
                                <button className="input-group-text" id="inputGroupFileAddon02" onClick={this.submitImage}>Upload</button>
                            </div>
                        </div>


                        <div className="list-group">
                            <a className="list-group-item">
                                <span className="glyphicon glyphicon-cog" aria-hidden="true"></span> <h4> {this.state.teacherName}</h4>
                                <div><h5 className="font-weight-light font-weight-bold "> {this.state.teacherMajor} teacher </h5></div>
                                <div><p className="font-weight-light font-weight-bold ">{this.state.info}</p></div>
                                <h4> <span class="badge badge-info">Class price {this.state.price}JD/Hour</span></h4>
                                <div></div>
                            </a>
                        </div>

                        <br/>

                        <div className=''>
                                    <a href="" class="list-group-item d-flex justify-content-between align-items-center">
                                        Messages <span class="badge badge-primary badge-pill">14</span>
                                    </a>

                                    <a href="./Teacher" class="list-group-item d-flex justify-content-between align-items-center">
                                        Comments  <span class="badge badge-primary badge-pill">2</span>
                                    </a>
                                

                                    <a href="" class="list-group-item d-flex justify-content-between align-items-center">
                                        something <span class="badge badge-primary badge-pill">1</span>
                                    </a>
                                </div>

<br/>

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

                        <br />

                    </div>
                </div>
            </div>
        )
    }
} 
}

export default Profile;
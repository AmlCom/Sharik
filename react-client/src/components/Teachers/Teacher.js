import React, { Component } from 'react';
import axios from 'axios';

import './Teacher.css'

class Teacher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: "",
            teacherName: "",
            teacherMajor: "",
            info: "",
            price: ""
        }
    }

    componentDidMount() {
        axios.get('/teacher').then((res) => {
            console.log("res", res);
            this.setState({
                image: res.data[0].image,
                teacherName: res.data[0].teacherName,
                teacherMajor: res.data[0].teacherMajor,
                info: res.data[0].info,
                price: res.data[0].price
            })

        }).catch((err) => {
            console.log('hi', err)
        })

    }

    render() {

    return (
        <div className=''>
            <div className='row '>
                <div className="col-md-2 container spacing">
                    <div className="card">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNimrjRZN3jIxU-D90rCnZ6pZvp9QF4t55QWP6PdOrCcyWpsvT" alt="" className="rounded" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h4 className="card-text">{this.state.teacherName}</h4>
                            <h5>{this.state.teacherMajor}</h5>
                            <h6>{this.state.info}</h6>
                            <h4> <span class="badge badge-info">Class price {this.state.price}JD/Hour</span></h4>
                            <button type="button" className="btn btn-info">Request</button>
                        </div>
                    </div>
                </div>

                <div className="col-md-9 container">
                    <div className='card-header text-white bg-info'>
                        <div className='d-flex flex-column bd-highlight mb-0.5'>
                            <h3>Comments</h3>
                        </div>
                    </div>

                    <br/>
                    <div className="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Write a comment" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <button className="btn btn-info" type="button">Comment</button>
                        </div>
                    </div>


                    <div className="card border-dark mb-3" >
                        <div className="card-header"> Person who made the commet</div>
                        <div className="card-body text-dark">
                            <p className="card-text"> The comment</p>
                        </div>
                    </div>
               </div>
            </div>
        </div>
         )
    }
}

export default Teacher;
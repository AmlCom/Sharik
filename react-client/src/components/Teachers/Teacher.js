import React, { Component } from 'react';
import './Teacher.css'

const Teacher = () => {
    return (
        <div className=''>
            <div className='row '>
                <div className="col-md-2 container spacing">
                    <div className="card">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNimrjRZN3jIxU-D90rCnZ6pZvp9QF4t55QWP6PdOrCcyWpsvT" alt="" className="rounded" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <p className="card-text">Teacher Name</p>
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
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" type="button">Comment</button>
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

export default Teacher;
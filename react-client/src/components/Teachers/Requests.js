import React, { Component } from 'react';



const Request = () => {
    return (
        <div className='container'>
        <div className="panel">
            <div className="panel-heading ">
                <h3 className="panel-title">Your requests</h3>
            </div>
            <div className="panel-body">
                <div className="row">
                </div>
                <br />
                <table className="table table-striped  ">
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
    )
}

export default Request;


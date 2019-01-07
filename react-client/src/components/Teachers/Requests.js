import React, { Component } from 'react';



class Request extends Component  {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

   

    render() {
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
                    {this.props.location.state.students.map((student) =>
                        <tr>
                            <td>{student.firstname}</td>
                            <td>{student.email}</td>
                            <td><a className="btn btn-success" href="">Accept</a> <a className="btn btn-danger" href="#">Reject</a></td>
                        </tr>
                    )}
                   
                </table>
            </div>
        </div>
</div>
    )
    }
}

export default Request;


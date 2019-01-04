import React, { Component } from 'react';
import './Teacher.css';
import axios from 'axios';
import Search from '../search'


class Teachers extends Component {
    state = {
        teachers: []
    }
    componentDidMount() {
        axios.get('get/teacher')
            .then((res) => {
                this.setState({
                    teachers: res.data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    searchTeacher = (name) => {
        console.log('i was research', name)
        this.setState({
            teachers: [name.data]
        })
    }

    render() {
        console.log('teachers', this.state.teachers)
        if (this.state.teachers.length === 1) {
            return (
                <form className='container flux'>
                    < Search search={this.searchTeacher} />
                    <div class="form-group">
                        <tr>
                            <td className='border'>
                                <img src={this.state.teachers[0].image} alt="" className="rounded card" />
                                <h6> {this.state.teachers[0].firstname} </h6>
                                <p> {this.state.teachers[0].lastname}</p>
                                <button type="submit" class="btn btn-primary" href="">Profile</button>
                            </td>
                        </tr>
                    </div>
                </form>
            )
        } else {
            return (
                <div className=''>
                    < Search search={this.searchTeacher} />
                    {this.state.teachers.map((teacher) =>
                    <div className='container'>
                    <div class="form-group float-left teacher">
                        <tr>
                            <td className='border'>
                                <img src={teacher.image} alt="" className="rounded card" />
                                <h6>{teacher.firstname} {teacher.lastname}</h6>
                                <p> {teacher.major}</p>
                                <button type="submit" class="btn btn-primary" href="">Profile</button>
                                <br/>
                        <br/>

                            </td>
                        </tr>
                    </div>
                 </div>
                    )}
                </div>
            )
        }
    }
}


export default Teachers;



{/* // <div class="card" style="width: 18rem;">
//   <img class="card-img-top" src={teacher.image} alt="Card image cap"/>
//   <div class="card-body">
//     <h5 class="card-title">{teacher.firstname} {teacher.lastname}</h5>
//     <p class="card-text">{teacher.major}</p>
//     <a href="#" class="btn btn-primary">Profile</a>
//   </div>
// </div> */}



{/* <form className='border'>
<div className='row'>
    <div className='col-md-3'>
    <img src={teacher.image} alt="" className="card border" />
    </div>

    <div className ='col-md-3'>
         <div className='row'>
         <br/>
             <h2>{teacher.firstname} {teacher.lastname}</h2>
             <div className='row'>
             <h3>{teacher.major}</h3>
             </div>
            
          </div>
        <div className='row'>
        <button type="submit" class="btn btn-primary btn-lg" href="">Profile</button>
        </div>
    </div>
</div>
</form> */}
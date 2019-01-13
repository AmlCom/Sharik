import React, { Component } from 'react';
import axios from 'axios';
import './Teacher.css';



class Comments2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: "",
            teacherName: "",
            teacherMajor: "",
            info: "",
            price: "",
            student_id: '',
            email: '',
            password: '',
            comments: []
        }
    }

    componentDidMount() {
        axios.get('/auth/checkLogging').
            then((x) => {

                if (x.data) {
                    this.setState({
                        Loggedin: true,
                        image: x.data.image,
                        teacherName: x.data.firstname,
                        comments: x.data.comments
                    })
                } else {
                    this.setState({
                        Loggedin: false
                    })
                }
            })
        axios.get('/teacher').then((res) => {
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


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        if (this.state.email === '') {
            alert('email cannot be empty');
        } else if (this.state.password === '') {
            alert('password cannot be empty');
        } else {
            event.preventDefault()
            const check = {
                email: this.state.email,
                password: this.state.password
            }

            axios.post('/auth/signin', check)
                .then(response => {
                    console.log('ert', response.data)
                    if (response.data) {
                        console.log('ezvfdgf')

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
    }

    addStudent = () => {
        axios.post('/addStudent', {
            teacherEmail: this.props.location.state.teacher.email,
            student_id: this.state.student_id
        })
            .then((response) => {
                alert(response.data)
            })
    }

    render() {
        console.log("my state", this.state)
        return this.state.comments.length > 0 ?
            (
                <div>
                    <div className='row '>
                        <div className="col-md-8 commentCol">
                            <div className="card-header"><h5>Comments</h5></div>
                            {this.state.comments.map((comment) => {
                                return (
                                    <div>
                                        <ul className='comments'>
                                            <li><h5> {comment.madeby}</h5></li>
                                            <li><p> {comment.comment}</p> </li>
                                            <hr/>
                                        </ul>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div >
            ) : (<div />)
    }
}
export default Comments2;







    // <div className='userComment'>
    //     <ul className=''><span></span>
    //         <li >
    //             <li className="card commentsCard" >
    //                 <h5 className="card-header"> {comment.madeby}</h5>
    //                 <div className="card-body">
    //                     <p className="card-text"> {comment.comment}</p>
    //                 </div>
    //             </li>
    //         </li>
    //     </ul>
    // </div>
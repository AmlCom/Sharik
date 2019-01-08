// import React, { Component } from 'react';
// import Shariklogo from './Shariklogo.png';
// import axios from 'axios';



// class Navbar extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             Loggedin: false,
//         }
//     }
//      componentDidMount() {
//     axios.get('/auth/checkLogging').
//     then((res) => {
//         if (res.data) {
//             this.setState({
//                 Loggedin: true
//             })
//         } else {
//             this.setState({
//                 Loggedin: false
//             })
//         }
//     })
//   }

//   logOut = () => {
//     axios.get('/auth/logout').then(() => {
//       window.location.assign("/");
//         })
//   }

//     render() {
// console.log('login',this.state.Loggedin)
//         if(this.state.Loggedin){
//         return (
//             <div>
//                 <nav className="navbar navbar-expand-lg">
//                     <nav className="navbar ">
//                         <a className="navbar-brand" href="/">
//                             <span><img src={Shariklogo} width="160" height="60" className="d-inline-block align-top" alt="Sharik Logo" />
//                             </span></a> </nav>
//                     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse mr-auto" id="navbarSupportedContent">
//                         <ul className="navbar-nav ml-auto">
//                             <li className="nav-item active">
//                                 <a className="nav-link  Navbar-text" href="#"  onClick={this.logOut} >Logout <span className="sr-only">(current)</span></a>
//                             </li>
//                         </ul>
//                     </div>
//                 </nav>
//             </div>
//         )
//         } else {
//             return (
//             <div>
//             <nav className="navbar navbar-expand-lg ">
//                 <nav className="navbar ">
//                     <a className="navbar-brand" href="/">
//                         <span><img src={Shariklogo} width="160" height="60" className="d-inline-block align-top" alt="Sharik Logo" />
//                         </span></a> </nav>
//                 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse mr-auto" id="navbarSupportedContent">
//                     <ul className="navbar-nav ml-auto">
//                         <li className="nav-item active">
//                             <a className="nav-link  Navbar-text" href="/signup">Signup <span className="sr-only">(current)</span></a>
//                         </li>
//                         <li className="nav-item active">
//                             <a className="nav-link  Navbar-text" href="/signin">Signin <span className="sr-only">(current)</span></a>
//                         </li>
//                     </ul>
//                 </div>
//             </nav>
//         </div> 
//             )
//         }
//     }
// }


// export default Navbar;

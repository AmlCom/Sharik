import React, { Component } from 'react';
import './Teacher.css';


const Teachers = () => {
    return (
        <div className='container'>
            <h5 className='panel-body col-md-6'>Search for a teacher</h5>
            <div className="col-md-6">
                <input className="form-control" type="text" placeholder="Filter Teachers..." />
            </div>


            <form className='container'>
                <div class="form-group">
                <tr>
                  
                    <td className='border'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNimrjRZN3jIxU-D90rCnZ6pZvp9QF4t55QWP6PdOrCcyWpsvT" alt="" className="rounded card" />
                    <br/>
                    <br/>
                    <h6> Teacher Name </h6>
                    <p> Teacher Major</p>
                    <br/>
                    <button type="submit" class="btn btn-primary" href="">Profile</button>
                    <br/>
                    <br/>
                    </td>

                   <div className='spacing'>
                    <td className='border'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNimrjRZN3jIxU-D90rCnZ6pZvp9QF4t55QWP6PdOrCcyWpsvT" alt="" className="rounded card" />
                    <br/>
                    <h6> Teacher Name</h6>
                    <br/>
                    <p> Teacher Major</p>
                    <br/>
                    <button type="submit" class="btn btn-primary" href="">Profile</button>
                    <br/>
                    <br/>
                    </td>

                    </div>  
                </tr>
                    

                    
                    

                </div>
            
                
            </form>

        </div>
    )
}


export default Teachers;
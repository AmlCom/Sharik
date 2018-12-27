import React from 'react';




const CreateTeacher = () => {
    return (

        <div className='container'>

            <div className='row'>
                <div className='col-md-3'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNimrjRZN3jIxU-D90rCnZ6pZvp9QF4t55QWP6PdOrCcyWpsvT" alt="" className="rounded" className="card-img-top" alt="..." />
                </div>

                <div className='col-md-5'>
                    <h3> The Name of the teacher</h3>
                </div>
            </div>
            <br />


            <div>
                <h3 className="panel-title list-group-item active">Your Service</h3>
                <br />
            </div>



            <div className='row'>
                <div className='col-md-10'>
                    <div className='row'>
                        <div className='col-md-3'>
                            <h4>Major</h4>
                        </div>
                        <div className='col-md-8'>
                            <input className="form-control" placeholder="description" />
                            <br />
                        </div>
                        <div className='col-md-3'>
                            <h4>Price for an hour</h4>
                        </div>
                        <div className='col-md-8'>
                            <input className="form-control" placeholder="description" />
                            <br />
                        </div>
                        <div className='col-md-3'>
                            <h4>Available times</h4>
                        </div>
                        <div className='col-md-8'>
                            <input className="form-control" placeholder="description" />
                            <br />
                        </div>
                        <div className='col-md-3'>
                            <h4>Description</h4>
                        </div>
                        <div className='col-md-8'>
                            <textarea className="form-control" placeholder="description" />
                            <br />
                        </div>
                    </div>
                </div>
            </div>

            <div className='row'>
            </div>
        </div>

    )
}

export default CreateTeacher;
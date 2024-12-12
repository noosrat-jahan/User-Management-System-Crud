import React from 'react';

import { RiArrowLeftDoubleFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Nav from './Nav';

const AddUsers = () => {

    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const gender = form.radio1.value
        const status = form.radio2.value
        const newUser = { name, email, gender, status }
        console.log(newUser);

        fetch('http://localhost:5000/userM', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.insertedId){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "New User added Successfully",
                        showConfirmButton: false,
                        timer: 5000
                      });
                    navigate('/')
                }
            })

    }

    return (
        <div className='w-full  border-2 border-green-600'>
            <Nav></Nav>
            <Link to="/" className=' text-[#000B58] font-bold flex items-center justify-center gap-3 ml-10 mt-10 p-2 shadow-xl w-40 bg-[#FFCCEA] rounded'> <RiArrowLeftDoubleFill /> View All user
            </Link>
            <h1 className='text-center font-semibold text-3xl'>Add New User</h1>
            <form onSubmit={handleSubmit} className='w-9/12 mx-auto my-10  space-y-3'>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name='name' placeholder="Name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name='email' placeholder="Email" className="input input-bordered" required />
                </div>


                <div className='flex items-center gap-2'>
                    <div className="label">
                        <span className="label-text">Gender</span>
                    </div>
                    <div className="form-control">
                        <label className="flex gap-3 cursor-pointer">
                            <span className="label-text">Male</span>
                            <input type="radio" name="radio1" value="male" className="radio checked:bg-blue-500" />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="flex gap-4 cursor-pointer">
                            <span className="label-text">Female</span>
                            <input type="radio" name="radio1" value="female" className="radio checked:bg-blue-500" />
                        </label>
                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    <div className="label">
                        <span className="label-text">Status</span>
                    </div>
                    <div className="form-control">
                        <label className="flex gap-3 cursor-pointer">
                            <span className="label-text">Active</span>
                            <input type="radio" name="radio2" value="active" className="radio checked:bg-blue-500" />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="flex gap-2 cursor-pointer">
                            <span className="label-text">Inactive</span>
                            <input type="radio" name="radio2" value="inactive" className="radio checked:bg-blue-500" />
                        </label>
                    </div>
                </div>

                <input type="submit" value="Save" className='bg-[#88C273] w-full btn font-bold text-xl' />
            </form>
        </div>
    );
};

export default AddUsers;
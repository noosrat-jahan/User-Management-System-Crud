import React, { useState } from 'react';
import { RiArrowLeftDoubleFill } from 'react-icons/ri';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Nav from './Nav';

const UpdateUser = () => {

    const userObj = useLoaderData()
    const {_id, name, email, gender, status} = userObj

    // const [selectedGender, setSelectedGender] = useState("female"); 

    const navigate = useNavigate()

    const handleUpdate = e =>{
        e.preventDefault()

        const form = e .target 
        const name = form.name.value 
        const email = form.email.value 
        const gender = form.radio1.value 
        const status = form.radio2.value 
        const updatedUserInfo = {name, email, gender, status}

        fetch(`http://localhost:5000/userM/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedUserInfo)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.modifiedCount > 0){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "User Info has been updated Successfully",
                    showConfirmButton: false,
                    timer: 5000
                  });
                navigate('/')
            }
        })
    }

    // const handlechange = e =>{
    //     e.preventDefault()
    //     setSelectedGender(e.target.value)
    // }

    return (
        <div className='w-full border-2 border-green-600'>
            <Nav></Nav>
            <Link to="/" className=' text-[#000B58] font-bold flex items-center justify-center gap-3 ml-10 mt-10 p-2 shadow-xl w-40 bg-[#FFCCEA] rounded'> <RiArrowLeftDoubleFill /> View All user
            </Link>
            <h1 className='text-center font-semibold text-3xl'>Update User Information</h1>
            <form onSubmit={handleUpdate} className='w-9/12 mx-auto my-10 space-y-3'>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name='name' defaultValue={name} placeholder="Name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name='email' defaultValue={email} placeholder="Email" className="input input-bordered" required />
                </div>

                {/* <input
          type="radio"
          value="male"
          checked={selectedGender === "male"}
          onChange={handleChange}
        />
<input
          type="radio"
          value="female"
          checked={selectedGender === "female"}
          onChange={handleChange}
        /> */}

                <div className='flex items-center gap-2'>
                    <div className="label">
                        <span className="label-text">Gender: </span>
                    </div>
                    <div className="form-control">
                        <label className="flex gap-3 cursor-pointer">
                            <span className="label-text">Male</span>
                            <input type="radio" 
                            // checked={gender === "male"}
                            // onChange={handlechange}
                              name="radio1" value="male" className="radio checked:bg-blue-500" />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="flex gap-4 cursor-pointer">
                            <span className="label-text">Female</span>
                            <input type="radio" 
                            // checked={gender === "female"}
                            // onChange={handlechange}
                            name="radio1" value="female"  className="radio checked:bg-blue-500" />
                        </label>
                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    <div className="label">
                        <span className="label-text">Status: </span>
                    </div>
                    <div className="form-control">
                        <label className="flex gap-3 cursor-pointer">
                            <span className="label-text">Active</span>
                            <input type="radio" 
                            // checked={status === 'active'} 
                            name="radio2" value="active" className="radio checked:bg-blue-500" />

                        </label>
                    </div>
                    <div className="form-control">
                        <label className="flex gap-2 cursor-pointer">
                            <span className="label-text">Inactive</span>
                            <input type="radio" 
                            // checked={status === 'inactive'}
                             name="radio2" value="inactive" className="radio checked:bg-blue-500" />
                        </label>
                    </div>
                </div>

                <input type="submit" value="Update" className='bg-[#88C273] w-full btn font-bold text-xl' />
            </form>
        </div>
    );
};

export default UpdateUser;
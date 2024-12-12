import React, { useState } from 'react';
import { FaEdit, FaUser } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import Nav from './Nav';

const ViewAllUsers = () => {

    const loadedUsers = useLoaderData()
    const [allUsers, setAllUsers] = useState(loadedUsers)

    const handleDelete = id => {

        Swal.fire({
            title: "Are you sure, you want to delete?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/userM/${id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);

                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your data has been deleted.",
                                icon: "success"
                            });
                            const remaining = allUsers.filter(user => user._id !== id)
                            setAllUsers(remaining)
                        }
                    })
            }
        });
    }


    return (

        <div className='w-full pb-3 border-2 border-green-600'>
            <Nav></Nav>
            <Link to="addusers" className=' text-[#000B58] font-bold flex items-center justify-center gap-3 ml-10 mt-10 p-2 shadow-xl w-40 bg-[#FFCCEA] rounded'> Add New user <FaUser />
            </Link>
            <div className="overflow-x-auto mt-10 px-5">
                <table className="table ">
                    {/* head */}
                    <thead className='text-lg bg-purple-900 text-white'>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>@Email</th>
                            <th>Gender</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='text-lg'>
                        {
                            allUsers.map((user, idx) => <tr key={user._id}>
                                <th>{idx + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.gender}</td>
                                <td>{user.status}</td>
                                <td className='flex gap-10'>
                                    <Link to={`/userM/${user._id}`} className='text-blue-500 '>
                                        <FaEdit></FaEdit>
                                    </Link>
                                    <button onClick={() => { handleDelete(user._id) }} className='text-red-500 '>
                                        <MdDelete></MdDelete>
                                    </button>
                                </td>
                                <td>
                                    
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewAllUsers;
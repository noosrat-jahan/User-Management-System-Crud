import React from 'react';
import { Link } from 'react-router-dom';


const Nav = () => {
    return (
        <div className='bg-[#88C273] flex items-center justify-around'>
            <div></div>
            <h1 className=' p-4 text-xl font-bold text-[#3B1E54]'>User Management System</h1>
            <Link to="signin" className='bg-pink-500 text-white font-semibold px-3 py-1 rounded'>Login</Link >
        </div>
    );
};

export default Nav;
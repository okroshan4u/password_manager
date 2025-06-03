import React from 'react'

const Navbar = () => {
    return (
        <nav className=' bg-slate-800 text-white'>
            <div className="mycontainer flex justify-around h-12  items-center px-4 py-5">

                <div className="logo font-bold text-white text-2xl">
                    <span className='text-green-700'> &lt;</span> 
                     Set
                    <span className='text-green-700'>Pass &gt; </span> </div>
                <button className='flex justify-between bg-slate-800 border gap-2 rounded p-1 text-center items-center px-2 hover:border-green-500'>
                    <img className='w-6 invert' src="/logo-github.svg" alt="GitHub" />
                    <span className='font-bold'>GitHub</span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar

import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef()
    const passwordref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })

    const [passwordArray, setpasswordArray] = useState([])


    const getpassword = async () => {
        let req = await fetch("http://localhost:3000/")
        let Passwords = await req.json()
        setpasswordArray(Passwords)
        console.log(Passwords)
    }


    useEffect(() => {
        getpassword()
    }, []);


    const showpassword = () => {
        passwordref.current.type = "text"
        if (ref.current.src.includes("/eye.svg")) {
            ref.current.src = "/eye-off.svg"
            passwordref.current.type = "password"
        }
        else {
            ref.current.src = "/eye.svg"
            passwordref.current.type = "text"
        }
    }

    const savepassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            // If any such password exits then delete it 
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
            setform({ site: "", username: "", password: "" })

            toast('🦄 saved successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
        }
        else {
            toast("Error:Password not saved")
        }

    }

    const deletepassword = async (id) => {
        console.log("Deleting... password with id", id)
        setpasswordArray(passwordArray.filter(item => item.id !== id))
        let res = await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
        toast('🦄 Delteted successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });

    }

    const editpassword = (id) => {
        console.log("Editing... password with id", id)
        setform({ ...passwordArray.filter(item => item.id === id)[0], id: id })
        setpasswordArray(passwordArray.filter(item => item.id !== id))
    }


    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copytext = (text) => {
        toast('🦄 copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });
        navigator.clipboard.writeText(text)
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />





            <div className="absolute inset-0 -z-10 h-full w-full">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>
            <div className="px-2 md:mycontainer min-h-[82.5vh] ">

                <h1 className="logo font-bold text-black text-4xl  text-center">
                    <span className='text-green-700'> &lt;</span>
                    Set
                    <span className='text-green-700'>Pass &gt; </span>
                </h1>

                <p className="logo font-bold text-green-900 text-lg  text-center">Your Own Password Manager</p>
                <div className="text-black flex flex-col py-4 items-center">

                    <input value={form.site} onChange={handlechange} className='rounded w-full border border-green-800 gap-8 p-2 py-1' placeholder='Enter the website URl' type="text" name='site' id='site' />
                    <div className="flex gap-8 flex-col md:flex-row w-full py-2">
                        <input value={form.username} onChange={handlechange} className='rounded w-full border border-green-800 p-2 py-1' type="text" placeholder='Enter the Username' name='username' id='username' />

                        <div className="relative">
                            <input ref={passwordref} value={form.password} onChange={handlechange} className='rounded w-full border border-green-800 p-2 py-1' type="password" placeholder='Enter the Password' name='password' id='password' />
                            <span className='cursor-pointer' onClick={showpassword} >
                                <img ref={ref} className=' absolute p-1 top-[4px] right-[3px]' width={26} src="/eye.svg" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savepassword} className='flex justify-center items-center w-fit  bg-green-400 rounded p-1 my-5'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save Password
                    </button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to shaow</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden mb-10 p-2">
                            <thead className='bg-green-800 text-white '>
                                <tr>
                                    <th className='py-3'>Site Name</th>
                                    <th className='py-3'>Username</th>
                                    <th className='py-3'>Password</th>
                                    <th className='py-3'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className=' bg-green-100 p-4 '>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}  >
                                        <td><div className='flex justify-center items-center text-center '> <a href="item.site" target='_blank'> {item.site}</a>
                                            <div className=' cursor-pointer mx-2 ' onClick={() => { copytext(item.site) }} >
                                                <i className="fa-solid fa-copy" ></i>
                                            </div>
                                        </div>
                                        </td>
                                        <td ><div className='flex justify-center items-center text-center ' >{item.username}
                                            <div className=' cursor-pointer mx-2 ' onClick={() => { copytext(item.username) }} >
                                                <i className="fa-solid fa-copy" ></i>
                                            </div>
                                        </div>
                                        </td>
                                        <td> <div className=' flex items-center text-center '> {"*".repeat(item.password.length)}
                                            <div className=' cursor-pointer mx-2 ' onClick={() => { copytext(item.password) }} >
                                                <i className="fa-solid fa-copy" ></i>
                                            </div>
                                        </div>
                                        </td>
                                        <td className='flex justify-center items-center text-center  cursor-pointer'>
                                            <div className=' cursor-pointer mx-2 flex items-center '>
                                                <i className="fa-solid fa-trash mx-2 py-1" onClick={() => { deletepassword(item.id) }}></i>
                                                <i className="fa-solid fa-pen-to-square mx-2 py-1" onClick={() => { editpassword(item.id) }} ></i>
                                            </div>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>}
                </div>
            </div>
        </>
    )
}

export default Manager

import React, { useState } from 'react'
import { Navigate } from "react-router-dom";
import axios from "axios"
import { API_BASE_URL } from '../../../config'


const Login = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
    })

    const getSigninValue = (e) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }


    const getData = () => {
        let data = {}
        data = values

        axios.post(API_BASE_URL + "/api/signin", data)
            .then(
                response => {
                    const token = response.data.access_token
                    localStorage.setItem('auth', true)
                    localStorage.setItem('authUser', token)
                    console.log(response.data, 88)

                    window.location.reload(false);
                })
            .catch(error => {
                console.log(`Error - ${error.message}`)
            })
    }

    localStorage.getItem("auth") ? <Navigate to='/dashboard' /> : <></>

    return (
        <div>
            <h1>Login page</h1>
            <div>
                <div >
                    <label htmlFor="form3Example3">Email address</label><br />
                    <input style={{ border: "1px solid black" }} type="email" name="email" value={values.email} onChange={getSigninValue} className="form-control form-control-lg" />
                </div>
                <div >
                    <label htmlFor="form3Example4">Password</label> <br />
                    <input style={{ border: "1px solid black" }} type="password" name="password" value={values.password} onChange={getSigninValue} className="form-control form-control-lg" />
                </div>
                <div >
                    <button onClick={getData} type="button" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login

// import { useState } from "react"
// import { useNavigate } from "react-router-dom";

// const Login = () => {

//     const navigate = useNavigate()

//     const [username, setusername] = useState("")
//     const [password, setpassword] = useState("")

//     const [authenticated, setauthenticated] = useState(
//         localStorage.getItem(localStorage.getItem("auth") || false)
//     );

//     const users = [{ username: "grigsgog@gmail.com", password: "123456" }]

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         const account = users.find((user) => user.username === username)
//         if (account && account.password === password) {
//             localStorage.setItem("auth", true)
//             navigate("/dashboard")
//         }
//     }

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     name="Username"
//                     value={username}
//                     onChange={(e) => setusername(e.target.value)}
//                 />
//                 <input
//                     type="password"
//                     name="Password"
//                     onChange={(e) => setpassword(e.target.value)}
//                 />
//                 <input type="submit" value="Submit" />
//             </form>
//         </div>
//     )
// }

// export default Login;
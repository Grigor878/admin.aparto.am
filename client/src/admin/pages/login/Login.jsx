import React from 'react'
import { useState, useContext } from "react";
import axios from "axios";
// import { API_BASE_URL, AxiosConfigs, getAxiosConfig } from "../config";




const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
    })
    const getSigninValue = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const getData = e => {
        e.preventDefault()
        let data = {};
        data = values
        console.log(data);
   
        axios.post('http://127.0.0.1:8000/api' + '/signin', data)
            .then(
                response => {
                    console.log(response.data,88)
                })
            .catch(error => {
                console.log();
            })

    }
    return (
        <div>
            <h1>Login page</h1>
            <form>
                <div >
                    <label  htmlFor="form3Example3">Email address</label><br />
                    <input style={{border: "1px solid black"}} type="email" name="email" value={values.email} onChange={getSigninValue} className="form-control form-control-lg" />
                </div>
                <div >
                    <label  htmlFor="form3Example4">Password</label> <br />
                    <input style={{border: "1px solid black"}} type="password" name="password" value={values.password} onChange={getSigninValue} className="form-control form-control-lg" />
                </div>
                <div >
                    <button onClick={getData} type="button" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login
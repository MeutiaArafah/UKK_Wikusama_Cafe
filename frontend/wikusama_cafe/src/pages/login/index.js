import React, { useState } from "react"
import axios from "axios"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = event => {
        event.preventDefault()
        let payLoad = { username, password }

        let url = `http://localhost:8000/auth`

        axios.post(url, payLoad)
            .then(response => {
                if (response.data.status == true) {
                    /** login succes */
                    /** grab token */
                    let token = response.data.token
                    /** grab data user */
                    let user = response.data.data

                    /** store to local storage */
                    localStorage.setItem('token', token)
                    localStorage.setItem('user', JSON.stringify(user)
                    )
                    window.alert(`Login Berhasil`)
                    window.location.href = "/home"
                } else {
                    /** wrong username/password */
                }
            })
            .catch(error => {
                window.alert(`Username or password may be wrong`)
            })
    }

    return (
        <div id="header" className="col-lg-12 row">
            <div className="col lg-4 vw-100 vh-100 d-flex justify-content-center align-items-center">
                
                <div className="col-md-9 p-3 border rounded-2">
                    <h2 className="text-center">
                        WIKUSAMA <span className="text-danger">CAFE</span>
                    </h2>

                    <form onSubmit={handleLogin} className="mt-4">
                        <input type="text"
                            className="form-control mb-2"
                            required={true}
                            placeholder="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />

                        <input type="password"
                            className="form-control mb-2"
                            required={true}
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)} />

                        <button type="submit"
                            className="btn btn-danger w-100 mb-2">
                            LOGIN
                        </button>

                    </form>
                </div>
            </div>

            <div className="col-lg-6 d-none d-md-block">
                <div className="w-100 vh-100"
                    style={{
                        backgroundImage: `url(/cafe.jpg)`, backgroundRepeat: false, backgroundSize: 'cover',
                        backgroundPosition: `center`
                    }} />
            </div>
        </div>
    )
}

export default Login
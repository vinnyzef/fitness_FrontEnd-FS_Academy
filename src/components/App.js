
import React, { useDebugValue, useEffect, useState } from "react"

import {
    BrowserRouter as Router,
    Routes,
    Routes as Switch,
    Link,
    useHistory, Route
} from "react-router-dom";
import SignUp from './SignUp'
import Routines from './Routines'
import Activities from './Activities'
import MyRoutines from "./MyRoutines.js";
import LogIn from "./LogInUser";
import SignUpUser from "./SignUpUser"
import Navbar from "./Navbar";
const App = () => {
    const [token, setToken] = useState("")

    useEffect(() => {
        setToken(!!localStorage.getItem("token"));
    }, []);
    return (

        <Router>
            <div>
                
                <Navbar />

            </div>

            <Switch >
                {token ? null
                    : (<Route exact path="/" element={<SignUp token={token} setToken={setToken} />} />)
                }

                <Route path="/routines" element={<Routines token={token} setToken={setToken} />} />
                <Route path="/myroutines" element={< MyRoutines token={token} setToken={setToken} />} />



                <Route path="/activities" element={<Activities />}></Route>
                
                <Route path="/LogInUser" element={<LogIn />} />
                <Route path="/SignUpUser" element={<SignUpUser />} />


            </Switch>


        </Router >

    )
}
export default App;
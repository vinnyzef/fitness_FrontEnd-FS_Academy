
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

const App = () => {
    const [token, setToken] = useState("")

    useEffect(() => {
        setToken(!!localStorage.getItem("token"));
    }, []);
    return (

        <Router>
            <div>
                <nav style={{ backgroundColor: "black", color: "white", display: "flex", flexDirection: "row", justifyContent: "end" }}>

                    <button><Link to="/routines">Go to Routines</Link></button>

                    <button><Link to="/activities">Go to Activities</Link></button>

                    <button><Link to="/myroutines">Go to My Routines</Link></button>

                </nav>
                <h1>
                    Welcome to Fitness-Trackr!
                  </h1>

            </div>

            <Switch >
                {token ? null
                    : (<Route exact path="/" element={<SignUp token={token} setToken={setToken} />} />)
                }

                <Route path="/routines" element={<Routines token={token} setToken={setToken} />} />
                <Route path="/myroutines" element={< MyRoutines token={token} setToken={setToken} />} />



                <Route path="/activities" element={<Activities />}></Route>



            </Switch>


        </Router >

    )
}
export default App;
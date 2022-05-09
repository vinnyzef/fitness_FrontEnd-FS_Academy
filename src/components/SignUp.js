
import React, { useState } from "react"




const SignUp = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { token, setToken } = props

    //calls to api to register a user
    const SignUpUser = (userObject) => {
        console.log(userObject)
        fetch('http://fitnesstrac-kr.herokuapp.com/api/users/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userObject)
        }).then(response => response.json())
            .then(result => {
                console.log(result);
                ``
                if (result.token) {
                    //set local storage and token state
                    localStorage.setItem("token", result.token);
                    setToken(localStorage.getItem("token"));
                }
            })
            .catch(console.error);
    }

    //calls to api to login user
    const LogInUser = (userObject) => {
        console.log(userObject)
        fetch('http://fitnesstrac-kr.herokuapp.com/api/users/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userObject)
        }).then(response => response.json())
            .then(result => {
                console.log(result);

                if (result.token) {
                    localStorage.setItem("token", result.token);
                    setToken(localStorage.getItem("token"));
                }
            })
            .catch(console.error);
    }



    const handleSignUp = (event) => {
        event.preventDefault()
        const temp =
        {
            username: username,
            password: password
        }
            ;
        SignUpUser(temp);
        //clears temp object for future inputs
        temp = {};
        setUsername("");
        setPassword("");
    }
    

    const handleLogIn = async (event) => {
        event.preventDefault();
        const response = await LogInUser(username, password)
        if (response) {
           return (LogInUser);
         } else {
           alert("Invalid Login, Try Again")
         }
        setUsername("");
        setPassword("");
        setLoggedIn(true);
      };


    return (
        <>
            <form>
                {/* <input value={user} onChange={handleChange} placeholder="user"></input> */}
                <input placeholder="Username" onChange={(event) => { setUsername(event.target.value) }}></input>
                <input placeholder="Password" onChange={(event) => { setPassword(event.target.value) }}></input>
            </form>
            <button onClick={handleLogIn}>Log-in</button>
            <button onClick={handleSignUp}>
                {" "}
        Don't have an account? Sign up
      </button>
        </>



    )
}
export default SignUp;
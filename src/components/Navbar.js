import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./styles/Navbar.css";

const Navbar = () => {
    const location = useLocation();
    const [displayVal, setDisplayVal] = useState(localStorage.getItem("token"));
    useEffect(() => {
        console.log("token navbar: ", localStorage.getItem("token"));
        setDisplayVal(localStorage.getItem("token"));
    }, [location]);
  
    const links = [
      {
        to: "/Activities",
        text: "Activities",
        shouldDisplay: true
      },
    {
      to: "/Routines",
      text: "Routines",
      shouldDisplay: true
    },
    
    {
        to: "/SignUpUser",
        text: "Sign Up",
        shouldDisplay: !displayVal
        
      },{
      to: "/LogInUser",
      text: "Login",
      shouldDisplay: !displayVal
    },
    {
      to: "/Myroutines",
      text: "My Routines",
      shouldDisplay: displayVal
    },
    {
      to: "/LogInUser",
      text: "Log out",
      shouldDisplay: displayVal, 
      onClick: () => localStorage.removeItem("token")
    },
  ]
  return (
    <div className="body">
      <div className="title"> Welcome to Fitness-Trackr!</div>
      <div className="menuitems">
        {links.map(link => {
          const { to, text, shouldDisplay, onClick = () => {}} = link;
          if(shouldDisplay){
            return (
              <div>
                <Link className="navlink" to={to} onClick={onClick}>{text}</Link>
              </div>
            );
          }
        })}

      </div>
    </div>
  );
}

export default Navbar;
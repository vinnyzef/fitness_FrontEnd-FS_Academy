import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { LogInUser } from "../api";
import ActionBar from "./ActionBar";
import './styles/Home.css'
import './styles/ActionBar.css'
const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");



  return (
    <div className="home_wrapper">
           <img src='https://thenerdd.files.wordpress.com/2020/12/1-3.jpg?w=1200'/>
        <div>
         
            <div className="dialogue_body">
                <h1>The Nether Trilogy Continues.</h1>
                <p>
            When	the	noble	realized	he	was	about	to	face	
embarrassment	at	the	hands	of	a	group	of	rowdy	
peasants,	he	took	matters	into	his	own	hands	and	
sent	his	armed	guards	to	deliver	resolution.	Rather	
than	face	the	consequences	of	beating	a	noble	to	near	
death,	the	characters all fled out	the	back	door,	
robbing	an	unsuspecting	ale	carter	of	his cargo,	
wagon, and	horses,	then	tearing	off	into	the	night.
<br/>
Remember	how	I	said it	escalated?	Well,	this	is	the	
point when things	REALLY	escalated.	After	a	series	of	
chaotic	encounters,	the	crew	wakes	up	in	the	middle	
of	unfamiliar	woods,	next	to	a	shattered	wagon,	with	
a figure	hogtied	hanging	from	a	tree,
            </p>

    
      <form >
        <input
          placeholder="Character Name"
          value={username}
          onChange={(e)=>{setUsername(e.target.value)}}
        ></input>
        <input
          placeholder="Class"
          type="password"
          onChange={(e)=>{setUsername(e.target.value)}}
        ></input>
        <button styles={{ width: "100px", height: "50px" }}>Submit</button>
      </form>
      </div>
      </div>
      <ActionBar/>
    </div>
  );
};

export default Home;
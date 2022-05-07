

import React, { useEffect, useState } from "react"



const Routines = () => {

    const [routines, setRoutines] = useState([]);
    const [name, setName] = useState("")
    const [goal, setGoal] = useState("")
    // const turnToArray = (obj) => {
    //     const routineArr = [];
    //     for (let objs of obj) {
    //         routineArr.push(objs);
    //     }
    //     return routineArr
    // }

    const getAllRoutines = async () => {
        const result = await fetch('http://fitnesstrac-kr.herokuapp.com/api/routines', {
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const json = await result.json()

        console.log("this is result=========")
        console.log(json);
        // console.log("this is result=========")
        setRoutines(json)


    }
    const addRoutine = async (n, g) => {
        try {
            const result = await fetch('http://fitnesstrac-kr.herokuapp.com/api/routines', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    name: n,
                    goal: g,
                    isPublic: true
                })
            })
            const json = await result.json()
            console.log(json)

        }

        catch (error) {
            console.error(error)
            throw (error)
        }
    }

    const handleRoutine = (event) => {
        event.preventDefault()

        addRoutine(name, goal);
        //clears values
        setName("");
        setGoal("");
    }



    useEffect(() => {
        getAllRoutines()
            .catch(console.error)


    }, []);

    return (
        <div>
            <form>
                Add a new Routine:
                <input placeholder='name' onChange={(event) => { setName(event.target.value) }}></input>
                <input placeholder='goal' onChange={(event) => { setGoal(event.target.value) }}></input>
                <button onClick={handleRoutine}>Submit new Routine!</button>
            </form>
            {/* <button>ROUTINE CHECK!!!</button> */}
            <div>{routines.map((route) => <div> <h1>{route.name}</h1>
                <h2>Goal: {route.goal}</h2>
                <div>
                    {route.activities.map((ra) => {
                        return <div>
                            <h3>Activity: {ra.name}</h3>
                            <h4>{ra.description}</h4>
                            <p> Count: {ra.count}</p>
                            <p> Duration: {ra.duration}</p></div>
                    })}
                </div>

            </div>)}</div>

        </div>
    )
}

export default Routines;
import React, { useEffect, useState } from "react"




const Routines = () => {

    const [routines, setRoutines] = useState([]);
    const [name, setName] = useState("")
    const [goal, setGoal] = useState("")


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
    const addRoutine = async (event) => {
        event.preventDefault()

        try {
            const result = await fetch('http://fitnesstrac-kr.herokuapp.com/api/routines', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    name: name,
                    goal: goal,
                    isPublic: true
                })
            })
            const json = await result.json()
            console.log(json)
            setRoutines([json, ...routines])
            setName("")
            setGoal("")
        }

        catch (error) {
            console.error(error)
            throw (error)
        }
    }
    const deleteRoutine = async (routineId) => {
        try {
            await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }

            })

            await getAllRoutines()

        } catch (error) {
            console.error(error)
            throw (error)
        }

    }

    const deleteRoutineActivity = async (raId) => {
        try {
            await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routine_activities/${raId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })

        } catch (error) {
            console.error(error)
            throw error

        }


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
                <button onClick={(event) => { addRoutine(event) }}>Submit new Routine!</button>
            </form>
            {/* <button>ROUTINE CHECK!!!</button> */}
            <div>{routines.map((route) => <div key={route.id}> <h1>{route.name}</h1>
                <h2>Goal: {route.goal}</h2>
                <button id={route.id} onClick={(event) => deleteRoutine(event.target.id)}>Delete Routine</button>
                <div>
                    {route.activities ?
                        route.activities.map((ra) => {
                            return <div key={ra.id}>
                                <h3>Activity: {ra.name}</h3>
                                <h4>{ra.description}</h4>
                                <p> Count: {ra.count}</p>
                                <p> Duration: {ra.duration}</p>
                                <button id={ra.id} onClick={(event) => deleteRoutineActivity(event.target.id)}>Delete Routine Activity</button>
                            </div>
                        })
                        : null}


                </div>


            </div>)}</div>

        </div>
    )
}

export default Routines;
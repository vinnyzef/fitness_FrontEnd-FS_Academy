import React, { useEffect, useState } from "react"



const MyRoutines = () => {
    const [routines, setRoutines] = useState([]);
    const [activities, setActivities] = useState([])
    const [name, setName] = useState("")
    const [goal, setGoal] = useState("")
    const [duration, setDuration] = useState("")
    const [count, setCount] = useState("")
    const [actId, setActId] = useState("")

    const getUser = async () => {
        try {
            const result = await fetch('http://fitnesstrac-kr.herokuapp.com/api/users/me', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            })

            const final = await result.json()

            return final

        } catch (error) {
            console.error(error)
            throw error
        }

    }

    const getAllRoutines = async () => {
        const userObj = await getUser()
        const user = await userObj.username;

        const result = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/users/${user}/routines`, {
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
    const getAllActivities = async () => {
        const result = await fetch('http://fitnesstrac-kr.herokuapp.com/api/activities', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await result.json()

        console.log("this is result=========")
        console.log(json);
        setActivities(json)
        console.log(activities)
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
    const updateRoutine = async (routineId) => {
        try {
            const updatedRoutine = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    name: name,
                    goal: goal
                })
            })

            const result = await updatedRoutine.json();
            getAllRoutines()

        } catch (error) {
            console.error(error)
            throw (error)
        }
    }
    const updateActivity = async (raId) => {
        try {
            const result = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routine_activities/${raId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    count: count,
                    duration: duration
                })
            })
            console.log(await result.json())
            getAllRoutines()

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
            getAllRoutines()
        } catch (error) {
            console.error(error)
            throw error

        }


    }
    const addActivityToRoutine = async (id) => {
        console.log(count)
        console.log(duration)
        console.log(actId)
        // event.preventDefault
        try {
            const result = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${id}/activities`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    activityId: actId,
                    count: count,
                    duration: duration
                })
            })
            console.log(await result.json())
            getAllRoutines()
        } catch (error) {
            console.error(error)
            throw (error)
        }

    }



    useEffect(() => {
        getAllRoutines()
            .catch(console.error)


        getAllActivities()
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
                    <input placeholder='name' onChange={(event) => { setName(event.target.value) }}></input>
                    <input placeholder='goal' onChange={(event) => { setGoal(event.target.value) }}></input>
                    <button id={route.id} onClick={(event) => updateRoutine(event.target.id)}>Update Routine</button>
                </div>
                <div>
                    <input placeholder='duration' onChange={(event) => { setDuration(event.target.value) }}></input>
                    <input placeholder='count' onChange={(event) => { setCount(event.target.value) }}></input>
                    <select id="activities" name="activities" onChange={(event) => { setActId(event.target.value) }}>
                        <option value="" disabled selected>Select your option</option>
                        {activities.map((act) => { return <option value={act.id} key={act.id}>{act.name}</option> })}


                    </select>
                    <button id={route.id} onClick={(event) => addActivityToRoutine(event.target.id)}>Add activity</button>
                </div>

                <div>

                    {route.activities ?
                        route.activities.map((ra) => {
                            return <div key={ra.id}>
                                <h3>Activity: {ra.name}</h3>
                                <h4>{ra.description}</h4>
                                <p> Count: {ra.count}</p>
                                <p> Duration: {ra.duration}</p>
                                <div>
                                    <input placeholder='duration' onChange={(event) => { setDuration(event.target.value) }}></input>
                                    <input placeholder='count' onChange={(event) => { setCount(event.target.value) }}></input>
                                    <button id={ra.routineActivityId} onClick={(event) => updateActivity(event.target.id)}>Update activity</button>
                                </div>
                                <button id={ra.routineActivityId} onClick={(event) => deleteRoutineActivity(event.target.id)}>Delete Routine Activity</button>
                            </div>
                        })
                        : null}


                </div>


            </div>)}</div>

        </div>
    )
}

export default MyRoutines 
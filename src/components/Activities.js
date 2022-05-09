import React, { useState, useEffect } from 'react';


const Activities = () => {
    const [activities, setActivities] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

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

    const addActivity = async (event) => {
        event.preventDefault()

        try {
            const result = await fetch('http://fitnesstrac-kr.herokuapp.com/api/activities', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    name: name,
                    description: description,
                    isPublic: true
                })
            })
            const json = await result.json()
            console.log(json)
            setActivities([json, ...activities])
            setName("")
            setDescription("")
        }
        catch (error) {
            console.error(error)
            throw (error)
        }
    }




    useEffect(() => {
        getAllActivities()
            .catch(console.error)

    }, []);


    return (
        <div>
            <form>
                Add a new Activity:
                <input placeholder='name' onChange={(event) => { setName(event.target.value) }}></input>
                <input placeholder='description' onChange={(event) => { setDescription(event.target.value) }}></input>
                <button onClick={(event) => { addActivity(event) }}>Submit new Activity!</button>
            </form>
            {/* <button>Activity CHECK!!!</button> */}
            <div>{activities.map((route) => <div key={route.id}> <h1>{route.name}</h1>
                <h2>Description: {route.description}</h2>
                <button id={route.id} onClick={(event) => deleteActivity(event.target.id)}>Delete Activity</button>
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

export default Activities;

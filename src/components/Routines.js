

import React, { useEffect, useState } from "react"



const Routines = () => {

    const [routines, setRoutines] = useState({});
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
        }).then(response => response.json())
            .then(result => {
                console.log("this is result=========")
                console.log(result);
                console.log("this is result=========")
                setRoutines({ ...routines, ...result })


            })

    }



    useEffect(() => {

        getAllRoutines()
            .catch(console.error)
        console.log(routines)

        // console.log(routines)
        // setRoutines(r);
    }, []);


    return (
        <div>


            {/* <button>ROUTINE CHECK!!!</button> */}








        </div>
    )
}

export default Routines;
import React from 'react'
import { fetchData } from '../helpers'
import { useLoaderData } from 'react-router-dom';

//Loader
export function dashboardLoader(){
    const userName = fetchData("userName");
    return { userName }
}

const Dashboard = () => {
    const { userName } = useLoaderData()
    return (
        <div>
            <h1>{userName}</h1>
            Dashboard
        </div>
    )
}

export default Dashboard
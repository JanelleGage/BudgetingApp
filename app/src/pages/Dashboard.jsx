import React from 'react'
import { createBudget, fetchData, waait } from '../helpers'
import { useLoaderData } from 'react-router-dom';
import Intro from '../components/Intro';
import { toast } from 'react-toastify';
import AddBugetForm from '../components/AddBudgetForm';
import AddExpenseFrom from '../components/AddExpenseFrom';

//Loader
export function dashboardLoader(){
    const userName = fetchData("userName");
    const budgets = fetchData("budgets");
    return { userName, budgets }
}

//Action
export async function dashboardAction({request}){
    await waait()

    const data = await request.formData()
    const {_action, ...values} = Object.fromEntries(data)

    //new user
    if(_action === "newUser"){
        try {
            localStorage.setItem("userName", JSON.stringify(values.userName))
            return toast.success(`Welcome, ${values.userName}`)
        } catch (e) {
            throw new Error("There was an errror creating your account.")
        }
    }

    if(_action === "createBudget"){
        try {
            //create budget
            createBudget({
                name: values.newBudget,
                amount: values.newBudgetAmount,
            })
            return toast.success("Budget created")
        } catch (e) {
            throw new Error("There was a problem creating your budget")
        }
    }
}

const Dashboard = () => {
    const { userName, budgets } = useLoaderData()
    return (
        <>
            {userName ? (
            <div className="dashboard">
                <h1>Welcome back, <span className="accent">{userName}</span></h1>
                <div className="grid-sm">
                    {
                        budgets && budgets.length > 0
                        ? (
                        <div className="grid-lg">
                            <div className="flex-lg">
                                <AddBugetForm />
                                <AddExpenseFrom budgets={budgets} />
                            </div>
                        </div>
                        ) 
                        : (
                            <div className="grid-sm">
                                <p>Personal budgeting is the secret to financial freedom.</p>
                                <p>Create a budget to get started!</p>
                                <AddBugetForm />
                            </div>
                        )
                    }
                </div>
            </div>
            ) : <Intro /> }
        </>
    )
}

export default Dashboard
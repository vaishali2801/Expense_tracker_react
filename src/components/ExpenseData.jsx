import React, { useContext } from 'react'
import { ExpenseContext } from "../context/ExpenseContext";

const ExpenseData = () => {
    const {balance,credit,debit} = useContext(ExpenseContext)
    return (
        <>
            <h2>Balance : {balance}</h2>
            <h2>Credit : {credit}</h2>
            <h2>Debit : {debit}</h2>
        </>
    )
}

export default ExpenseData

import React, { useState, createContext } from 'react';

//create context
export const expenseContext = createContext({
    expenseList: [],
    setExpenseList: () => {},
});

//provider context
const ExpenseContext = ({ children }) => {
    const initialState = [
        {
            title: "Pizza",
            category: "Food",
            description: "Dinner",
            amount: 400,
            type: "debit",
            date: "2026-07-28"
        }
    ]
    const [expenseList, setExpenseList] = useState(initialState);
    const values = {
        expenseList,
        setExpenseList,
    }
    return (
        <>
            <expenseContext.Provider value={values}>{children}</expenseContext.Provider>
        </>
    )
}

export default ExpenseContext

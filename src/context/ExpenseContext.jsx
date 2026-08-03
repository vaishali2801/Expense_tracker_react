import React, { useState, createContext, useEffect } from 'react';

//create context
export const ExpenseContext = createContext({
    expenseList: [],
    addExpense: () => { },
    handleExpenseEdit: () => { },
    deleteExpense: () => { },
    editValue: null,
    balance:0,
    credit: 0,
    debit: 0,
});

//provider context
const ExpenseContextProvider = ({ children }) => {
    const initialState = [
        {
            id: 1,
            title: "Pizza",
            category: "Food",
            description: "Dinner",
            amount: 400,
            type: "debit",
            date: "2026-07-28"
        }
    ]
    //store data in local storage (5MB)
    const [expenseList, setExpenseList] = useState(()=>{

        const saved =  localStorage.getItem("expense");

        return saved ? JSON.parse(saved) :initialState

    });

    useEffect(()=>{
        localStorage.setItem("expense",JSON.stringify(expenseList))
    },[expenseList])
    const [editValue, setEditValue] = useState(null);


    const addExpense = (input) => {
        if (!input) {
            alert("fill all the detail");
        } else if (editValue) {
            setExpenseList((prev) =>
                prev.map((d) =>
                    d.id === editValue.id
                        ? {
                            ...d,
                            title: input.title,
                            description: input.description,
                            category: input.category,
                            amount: input.amount,
                            date: input.date,
                            type: input.type,
                        }
                        : d,
                ),
            );

            setEditValue(null);
        } else {
            const newExpense = {
                id: new Date().getTime(),
                title: input.title,
                description: input.description,
                category: input.category,
                amount: input.amount,
                date: input.date,
                type: input.type,
            };

            setExpenseList((prev) => [...prev, newExpense]);
        }
    };

    //delete
    const deleteExpense = (id) => {
        const remainExpenseList = expenseList.filter(
            (expense) => expense.id !== id,
        );

        setExpenseList(remainExpenseList);

        alert("expense deleted successfully");
    };

    //edit
    const handleExpenseEdit = (id) => {
        const editExpense = expenseList.find((expense) => expense.id === id);

        setEditValue(editExpense);
    };

    //credit
    const credit = expenseList.filter((expense) => expense.type === "credit").reduce((acc, curr) => {
        return (acc += Number(curr.amount));
    }, 0)

    //debit
    const debit = expenseList.filter((expense) => expense.type === "debit").reduce((acc, curr) => {
        return (acc += Number(curr.amount));
    }, 0)

    //balance
    const balance = credit - debit;

    const values = {
        expenseList,
        addExpense,
        handleExpenseEdit,
        deleteExpense,
        editValue,
        balance,
        credit,
        debit
    }
    return (
        <>
            <ExpenseContext.Provider value={values}>{children}</ExpenseContext.Provider>
        </>
    )
}

export default ExpenseContextProvider

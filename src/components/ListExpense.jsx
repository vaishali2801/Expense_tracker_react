import React, { useContext } from 'react'
import { ExpenseContext } from "../context/ExpenseContext";

const ListExpense = () => {
    const { expenseList,handleExpenseEdit ,deleteExpense} = useContext(ExpenseContext);

    return (
        <>
            <table border={2}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {expenseList.map((expense, index) => {
                        return (
                            <tr key={expense.id}>
                                <td>{index + 1}</td>
                                <td>{expense.title}</td>
                                <td>{expense.amount}</td>
                                <td>{expense.category}</td>
                                <td>{expense.description}</td>
                                <td>{expense.type}</td>
                                <td>{expense.date}</td>
                                <td>
                                    <button onClick={() => handleExpenseEdit(expense.id)} >Edit</button>
                                </td>
                                <td>
                                    <button onClick={() => deleteExpense(expense.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default ListExpense

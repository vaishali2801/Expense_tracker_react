import React, { useContext, useState } from 'react'
import { ExpenseContext } from "../context/ExpenseContext";

const ListExpense = () => {
    const { expenseList, handleExpenseEdit, deleteExpense } = useContext(ExpenseContext);

    const [ExpenseQuery, setExpenseQuery] = useState({
        title: "",
        type: "all",
        category: "all",
        sort: ""
    })

    const handleChange = (field, e) => {
        setExpenseQuery((prev) => {
            return {
                ...prev,
                [field]: e.target.value,
            }
        })
    }

    const filteredExpenses = expenseList.filter((expense) => {
        const titleMatch = expense.title.toLowerCase()
            .includes(ExpenseQuery.title.toLowerCase());

        const typeMatch = ExpenseQuery.type === "all" || expense.type === ExpenseQuery.type;

        const categoryMatch = ExpenseQuery.category === "all" ||
            expense.category === ExpenseQuery.category;

        return titleMatch && typeMatch && categoryMatch;
    })
        .sort((a, b) => {
            switch (ExpenseQuery.sort) {
                case "ascending":
                    return a.title.localeCompare(b.title);

                case "descending":
                    return b.title.localeCompare(a.title);

                case "Money ascending":
                    return a.amount - b.amount;

                case "Money descending":
                    return b.amount - a.amount;

                default:
                    return 0;
            }
        });
    return (
        <>
            <form action="">
                <label htmlFor="Title">Title : </label>
                <input type="text" placeholder='enter title' value={ExpenseQuery.title} onChange={(e) => handleChange("title", e)} />

                <label htmlFor="type">Type : </label>
                <select name="type" id="" value={ExpenseQuery.type} onChange={(e) => handleChange("type", e)}>
                    <option value="all" selected>All</option>
                    <option value="debit">Debit</option>
                    <option value="credit">Credit</option>
                </select>

                <label htmlFor="category">Category : </label>
                <select name=" category" id="" value={ExpenseQuery.category} onChange={(e) => handleChange("category", e)}>
                    <option value="all">All</option>
                    <option value="food">Food</option>
                    <option value="general" selected>general</option>
                    <option value="travel">travel</option>
                    <option value="hospital">hospital</option>
                    <option value="school">school</option>
                    <option value="other">other</option>
                </select>

                <label htmlFor="sort">Sort : </label>
                <select name="sort" id="" value={ExpenseQuery.sort} onChange={(e) => handleChange("sort", e)}>
                    <option value="">Sort By</option>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                    <option value="Money ascending">Money Ascending</option>
                    <option value="Money descending">Money descending</option>
                </select>
            </form>
            <br />
            {filteredExpenses.length > 0 ?
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
                        {filteredExpenses.map((expense, index) => {
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
                </table> : <h1>data not found</h1>}

        </>
    )
}

export default ListExpense

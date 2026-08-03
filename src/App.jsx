import React from 'react'
import AddExpense from "./components/AddExpense";
import ListExpense from './components/ListExpense';
import ExpenseData from './components/Expensedata';


const App = () => {
  return (
    <div>
      <AddExpense />
      <br />
      <br />
      <ExpenseData/>
      <br />
      <ListExpense/>

    </div>
  )
}

export default App

import React, {useState} from 'react'

function NewTransactions() {

    //useState
    const [isClicked, setIsClicked] = useState({
        date:"",
        description:"",
        category:"",
        amount:"",
    })
    // Logs the data written on the Search bar
       const handleChange = (e) => {
        console.log(e.target.value)
        console.log(setIsClicked({
            ...isClicked,
            [e.target.name] : e.target.value,   
        }))
    }
    // submit function
        const handleSubmit = (e) => {
             e.preventDefault();
            fetch('http://localhost:3000/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(isClicked),
        })
        .then(response => response.json()) 
        .then(data => {
            setIsClicked({
                ...isClicked,
                date: data.date,
                description: data.description,
                category: data.category,
                amount: data.amount,
                id:data.id++
            });
            window.location.reload() /// Auto-reloads the window to display the new transaction
        })
       
    };

    // Html elements to add new transaction
  return (
    <form onSubmit={handleSubmit} className = "formInput">
        <input id = "inputTransaction" name='date' type="date" onChange={handleChange}  />
        <input id = "inputTransaction" type="text" name='description' placeholder='Description' onChange={handleChange} />
        <input id="type" placeholder= "Category" name='category' onChange = {handleChange} />
        <input id = "inputTransaction" type="number" name='amount' placeholder='Amount' onChange={handleChange}  />
        <button id = "newTransactions" type="submit" >New Transaction</button>
    </form>
  )
}

export default NewTransactions
import React, { useState, useEffect } from "react";
import NewTransactions from "./NewTransactions";
import TransactionList from "./TransactionList";

function Home() {
  // UseState
  const [allTransactions, setAllTransactions] = useState([]);
  const [search, onSearch] = useState("")
  console.log(search);
  // use Effect
  useEffect(() => {
    fetch(`http://localhost:3000/transactions`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAllTransactions(data);
      })
      
      .catch((error) => console.error(error));
  }, []);


  //Delete function
  async function handleDeleteTransaction(transactionId) {
    try {
      await fetch(`http://localhost:3000//transactions/${transactionId}`, {
        method: 'DELETE',
      });

      setAllTransactions(prevTransactions =>
        prevTransactions.filter(transaction => transaction.id !== transactionId)
      );
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  }


  //the Html for the search bar
  return (
    <div>
      <h1 className="welcome-header">Welcome to The Bank of Flatiron</h1>
      <div>
        <input
          id="input"
          type="text"
          placeholder="Search ...."
          onChange={(e)=>onSearch(e.target.value)}
        />

      </div>
      <TransactionList
        transactions={allTransactions} //Props
        onDeleteTransaction={handleDeleteTransaction}
        search={search}
      />
      <NewTransactions />
    </div>
  );
}

export default Home;

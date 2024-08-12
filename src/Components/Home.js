import React, { useState, useEffect } from 'react';
import NewTransactions from './NewTransactions';
import TransactionList from './TransactionList';


function Home() {
  // UseState
  const [allTransactions, setAllTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
// use Effect
  useEffect(() => {
    fetch(`http://localhost:3000/transactions?q=${searchQuery}`) //Searching, (not yet working)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setAllTransactions(data);
      })
      .catch(error => console.error(error));
  }, [searchQuery]);

  //search function
  function handleSearch(e) {
    setSearchQuery(e.target.value);
  }

//Delete function
  function handleDeleteTransaction(transactionId) {
       fetch(`http://localhost:3000/transactions${transactionId}`, {
        method: 'DELETE',
      })
      .then((r)=>r.json())
      .then(()=>
        setAllTransactions(prevTransactions =>
        prevTransactions.filter(transaction => transaction.id !== transactionId))
      );
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
          onChange={handleSearch}
        />
        <button id="searchButton">Search</button>
      </div>
      <TransactionList
        transactions={allTransactions}  //Props 
        onDeleteTransaction={handleDeleteTransaction}
      />
      <NewTransactions />
    </div>
  );
}

export default Home;
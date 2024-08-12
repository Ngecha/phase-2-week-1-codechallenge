import React from "react";

function TransactionList({ transactions, search, onDeleteTransaction }) {
  return (
    <div className="transaction-list">
      <h2>Transaction List</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions
            .filter((transaction) => {
              return search.toLowerCase() === ""
                ? transaction
                : transaction.description.toLowerCase().includes(search);
            })
            .map((transaction) => (
              <tr key={transaction.id} className="transaction-item">
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>{transaction.category}</td>
                <td>{transaction.amount}</td>
                <td>
                  <button onClick={() => onDeleteTransaction(transaction.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;

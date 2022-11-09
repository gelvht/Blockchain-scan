import React from 'react';

import './transactions.scss';
import { ITransactions } from './transactionTypes';

const Transactions = ({ header, transactions, selected }: ITransactions): JSX.Element => {
  return (
    <div className="transactions h-60 overflow-scroll border rounded-2">
      <h1 className="bg-light fw-semibold fs-4 p-3 text-body">Latest {header} Transactions</h1>
      <ul className="transactions__list p-3">
        {transactions.map(transaction => (
          <li
            key={transaction.txHash}
            className={`border-bottom p-1 d-flex align-items-start justify-content-between ${
              selected?.transactions.includes(transaction.txHash) && 'transaction__selected'
            }`}
          >
            <div className="d-flex flex-column align-items-start">
              <div className="text-muted fw-bold">
                TxHash: <span className="transaction__text">{transaction.txHash}</span>
              </div>
              <div className="text-muted fw-bold">
                From: <span className="transaction__text">{transaction.from}</span>
              </div>
              <div className="text-muted fw-bold">
                To: <span className="transaction__text">{transaction.to}</span>
              </div>
            </div>
            <div className="badge rounded-pill bg-primary text-white">{transaction.amount}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(Transactions);

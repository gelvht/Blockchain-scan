import React, { useState } from 'react';

import './app.scss';
import { useData, useMaker } from './hooks';
import { ITransaction, IBlock } from './types';

import Accounts from './components/Accounts/Account';
import Blocks from './components/Blocks/Block';
import Transactions from './components/Transactions/Transactions';

export interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
  const [selected, setSelected] = useState<IBlock>();
  const { accounts, blocks, transactions, addNewAccount, addNewBlock, addNewTransaction } =
    useData();
  const maker = useMaker({
    accounts: accounts,
    account: addNewAccount,
    block: addNewBlock,
    transaction: addNewTransaction,
  });

  const success = (): ITransaction[] => {
    return transactions.filter(transaction => transaction.isSuccess);
  };
  const failed = (): ITransaction[] => {
    return transactions.filter(transaction => !transaction.isSuccess);
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Blockchain Scan</h1>
      <div className="app m-3">
        <Blocks blocks={blocks} changeHandler={block => setSelected(block)} selected={selected} />
        <Accounts accounts={accounts} />
        <Transactions transactions={failed()} selected={selected} header={'Failed'} />
        <Transactions transactions={success()} selected={selected} header={'Success'} />
      </div>
    </div>
  );
};

export default App;

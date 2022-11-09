import { useState, useEffect } from 'react';

import { ADDRESSES } from '../data';
import { IAccount, IBlock, ITransaction } from '../types';
import { BLOCK_WINNER_REWARD } from './../constants/index';

const useData = () => {
  const [accounts, setAccounts] = useState<Array<IAccount>>(ADDRESSES);
  const [transactions, setTransactions] = useState<Array<ITransaction>>([]);
  const [blocks, setBlocks] = useState<Array<IBlock>>([]);
  let isSuspend = false;

  const addNewAccount = (address: string) => {
    setAccounts(prev => [...prev, { address, balance: 0, isSuspend: false }]);
    console.log('New Address', address);
  };

  const addNewTransaction = (transaction: ITransaction) => {
    console.log('New Transaction', transaction);
    setAccounts(prev => {
      const from = prev.filter(item => item.address === transaction.from)[0];
      const to = prev.filter(item => item.address === transaction.to)[0];
      isSuspend = transaction.amount + transaction.fee < from.balance;

      if (isSuspend) {
        const fromNewBalance = from.balance - transaction.fee;
        const toNewBalance = to.balance + transaction.fee;
        const fromIndex = prev.findIndex(item => item === from);
        prev[fromIndex] = { ...from, balance: fromNewBalance };
        const toIndex = prev.findIndex(item => item === from);
        prev[toIndex] = { ...from, balance: toNewBalance };
      } else {
        from.isSuspend = true;
      }
      return prev;
    });
    setTransactions(prev => [...prev, { ...transaction, isSuccess: isSuspend }]);
  };

  const addNewBlock = (block: IBlock) => {
    console.log('New Block', block);

    setAccounts(prev => {
      const winner = prev.findIndex(item => item.address === block.winner);
      prev[winner] = { ...prev[winner], balance: prev[winner].balance + BLOCK_WINNER_REWARD };
      return prev;
    });
    setBlocks(prev => [...prev, block]);
  };

  useEffect(() => {
    setAccounts(ADDRESSES);
  }, []);

  return {
    accounts,
    transactions,
    blocks,
    addNewAccount,
    addNewTransaction,
    addNewBlock,
  };
};

export default useData;

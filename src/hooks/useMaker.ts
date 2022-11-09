import { useRef, useEffect } from 'react';

import { useInterval } from './';
import { ITransaction, IBlock, IAccount } from './../types/index';
import {addressGenerator, amountGenerator, txHashGenerator, randomArrSelect, idGenerator,} from '../utils';
import {TRANSACTION_FEE, NEW_ADDRESS_INTERVAL, NEW_TRANSACTION_INTERVAL, NEW_BLOCK_INTERVAL,} from '../constants';

export interface UseMakerProps {
  accounts: IAccount[];
  account: (address: string) => void;
  transaction: (transaction: ITransaction) => void;
  block: (block: IBlock) => void;
}

const useMaker = ({ accounts, account, transaction, block }: UseMakerProps) => {

  const accountsRef = useRef<Array<IAccount>>(accounts);
  const transactionsRef = useRef<Array<string>>([]);

  const onMakeAddressHandler = () => {
    const newAccountAddress: string = addressGenerator();
    account(newAccountAddress);
  };
  useInterval(onMakeAddressHandler, NEW_ADDRESS_INTERVAL);

  const onMakeTransactionHandler = () => {

    const newTransaction: ITransaction = {
      fee: TRANSACTION_FEE,
      amount: amountGenerator(),
      txHash: txHashGenerator(),
      to: randomArrSelect(accountsRef.current)?.address,
      from: randomArrSelect(accountsRef.current)?.address,
    };

    transaction(newTransaction);
    transactionsRef.current.push(newTransaction.txHash);
  };
  useInterval(onMakeTransactionHandler, NEW_TRANSACTION_INTERVAL);

  const onMakeBlockHandler = () => {

    const newBlock: IBlock = {
      id: idGenerator(),
      transactions: transactionsRef.current,
      winner: randomArrSelect(accountsRef.current).address,
    };
    
    block(newBlock);
    transactionsRef.current = [];
  };
  useInterval(onMakeBlockHandler, NEW_BLOCK_INTERVAL);

  useEffect(() => {
    accountsRef.current = accounts;
  }, [accounts]);

};

export default useMaker;

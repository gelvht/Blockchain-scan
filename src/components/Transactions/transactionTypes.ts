import { IBlock, ITransaction } from '../../types';

export type ITransactions = {
  header: string;
  selected?: IBlock;
  transactions: ITransaction[];
};

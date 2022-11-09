import { IBlock } from '../../types';

export type IBlocks = {
  blocks: IBlock[];
  selected?: IBlock;
  changeHandler: (block: IBlock) => void;
};

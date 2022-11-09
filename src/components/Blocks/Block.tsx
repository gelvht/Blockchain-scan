import React from 'react';

import { IBlocks } from './blocksType';

const Blocks = ({ selected, blocks, changeHandler }: IBlocks): JSX.Element => {
  return (
    <div className="blocks h-60 overflow-scroll border rounded-2">
      <h1 className="bg-light fw-semibold fs-4 p-3 text-body">Latest Blocks</h1>
      <ul className="blocks__list p-3">
        {blocks.map(block => {
          return (
            <li
              key={block.id}
              className="border-bottom p-1 d-flex align-items-start justify-content-between"
            >
              <div className="d-flex align-items-start">
                <input
                  type="checkbox"
                  className="m-2"
                  checked={selected === block}
                  onChange={() => changeHandler(block)}
                />
                <div className="">
                  <div className="d-flex flex-column align-items-start">
                    <div className="text-muted fw-bold">
                      Block No. <span className="text-body">{block.id}</span>
                    </div>
                    <div className="text-muted">Winner:</div>
                    <div className="fs-6 fst-italic">{block.winner}</div>
                  </div>
                </div>
              </div>
              <div className="badge rounded-pill bg-primary text-white">
                {block.transactions.length}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default React.memo(Blocks);

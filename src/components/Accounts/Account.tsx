import React from 'react';

import { IAccounts } from './accountsType';

const Accounts = ({ accounts }: IAccounts): JSX.Element => {
  return (
    <div className="accounts h-60 overflow-scroll border rounded-2">
      <ul className="accounts__list p-3">
        {accounts.map(account => (
          <li key={account.address} className="border-bottom d-flex p-1 justify-content-between">
            <div
              className={`account__address fw-semibold fs-6  ${
                account.isSuspend && 'text-decoration-line-through text-black-50'
              }`}
            >
              {account.address}
            </div>
            <div className="account__balance rounded-pill badge bg-primary text-white p-2">
              {account.balance}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(Accounts);

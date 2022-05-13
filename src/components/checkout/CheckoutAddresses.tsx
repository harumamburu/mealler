import React, { useContext } from 'react';

import AddressContext from '../../store/addresses-context';
import styles from './CheckoutAddresses.module.css';

const CheckoutAddresses = (props: { userId: string; onSignIn: () => void }) => {
  const addressCtx = useContext(AddressContext);

  return (
    <>
      {!props.userId && (
        <p>
          {'Have a profile?'}
          <button className={styles.checkoutsignin} onClick={props.onSignIn}>
            Sign In
          </button>
          {'to look up your known addresses'}
        </p>
      )}
      {props.userId && (
        <div className={styles.address}>
          <label htmlFor="checkout-addresses">Known Addresses</label>
          <select
            id="checkout-addresses"
            defaultValue="placeholder"
            onChange={(event) => addressCtx.setCurrentAddress(event.currentTarget.value)}
          >
            <option key="placeholder" value="placeholder" disabled>
              ...
            </option>
            {addressCtx.addresses.map((address) => (
              <option key={address.id} value={address.id}>
                {`${address.name}: ${address.house} ${address.street}${
                  address.appartment ? `, ${address.appartment}` : ''
                }`}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
};

export default CheckoutAddresses;

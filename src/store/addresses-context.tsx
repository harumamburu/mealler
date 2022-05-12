import React, { ReactNode, useEffect, useState } from 'react';
import deepEqual from 'deep-equal';

import Address from '../model/Address';
import { fetchAddresses, saveAddress as saveAdr } from '../lib/api';

type AddressesContext = {
  addresses: Address[];
  saveAddress: (address: Address) => void;
};

const AddressContext = React.createContext<AddressesContext>({
  addresses: [],
  saveAddress: () => {},
});

export const AddressContextProvider = (props: { userId: string; children?: ReactNode }) => {
  const [addresses, setAddresses] = useState<Address[]>([]);

  const { userId } = props;
  useEffect(() => {
    if (userId) {
      fetchAddresses(userId).then((addresses) =>
        setAddresses(
          // this is to filter out ids
          addresses.map(({ name, phone, email, street, house, appartment }) => ({
            name,
            phone,
            email,
            street,
            house,
            appartment,
          }))
        )
      );
    } else {
      setAddresses([]);
    }
  }, [userId]);

  const saveAddress = (address: Address) => {
    if (addresses.filter((adr) => deepEqual(adr, address)).length === 0) {
      saveAdr(userId, address).then(() => setAddresses([...addresses, address]));
    }
  };

  return (
    <AddressContext.Provider value={{ addresses, saveAddress }}>
      {props.children}
    </AddressContext.Provider>
  );
};

export default AddressContext;

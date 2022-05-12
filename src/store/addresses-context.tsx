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
      fetchAddresses(userId).then((addresses) => setAddresses(addresses));
    } else {
      setAddresses([]);
    }
  }, [userId]);

  const saveAddress = (address: Address) => {
    if (
      addresses
        // this is to filter out ids
        .map(({ name, phone, email, street, house, appartment }) => ({
          name,
          phone,
          email,
          street,
          house,
          appartment,
        }))
        .filter((adr) => deepEqual(adr, address)).length === 0
    ) {
      saveAdr(userId, address).then(({ addressId }) =>
        setAddresses([...addresses, { id: addressId, ...address }])
      );
    }
  };

  return (
    <AddressContext.Provider value={{ addresses, saveAddress }}>
      {props.children}
    </AddressContext.Provider>
  );
};

export default AddressContext;

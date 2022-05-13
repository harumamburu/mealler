import React, { ReactNode, useEffect, useState } from 'react';
import deepEqual from 'deep-equal';

import Address from '../model/Address';
import { fetchAddresses, saveAddress as saveAdr } from '../lib/api';

type AddressesContext = {
  addresses: Address[];
  currentAddress: Address | null;
  saveAddress: (address: Address) => void;
  setCurrentAddress: (addressId: string) => void;
};

const AddressContext = React.createContext<AddressesContext>({
  addresses: [],
  currentAddress: {} as Address,
  saveAddress: () => {},
  setCurrentAddress: () => {},
});

export const AddressContextProvider = (props: { userId: string; children?: ReactNode }) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [currentAddress, setAddress] = useState<Address | null>(null);

  const { userId } = props;
  useEffect(() => {
    if (userId) {
      fetchAddresses(userId).then((addresses) => setAddresses(addresses));
    } else {
      setAddresses([]);
      setAddress(null);
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
  const setCurrentAddress = (addressId: string) => {
    setAddress(addresses.find((address) => address.id === addressId) || null);
  };

  return (
    <AddressContext.Provider value={{ addresses, currentAddress, saveAddress, setCurrentAddress }}>
      {props.children}
    </AddressContext.Provider>
  );
};

export default AddressContext;

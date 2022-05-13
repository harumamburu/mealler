import { useContext, useEffect } from 'react';

import AuthContext from '../../../store/auth-context';
import { fetchAddresses } from '../../../lib/api';
import Spinner from '../../ui/spinner/Spinner';
import useHttp, { Status } from '../../../hooks/use-http';

const KnownAddresses = () => {
  const authContext = useContext(AuthContext);
  const { httpCallback, data, error, status } = useHttp(fetchAddresses, true);
  useEffect(() => {
    httpCallback(authContext.userId);
  }, [httpCallback]);

  return (
    <>
      {status === Status.PENDING && <Spinner />}
      {error && <span>{error}</span>}
      {data && (
        <ul>
          {data.map((address, index) => (
            <li key={`address_${index}`}>
              {`${address.name}: ${address.house} ${address.street}${
                address.appartment ? `, Apt. ${address.appartment}` : ''
              }`}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default KnownAddresses;

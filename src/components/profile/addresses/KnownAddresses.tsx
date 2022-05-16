import { useContext, useEffect } from 'react';

import AuthContext from '../../../store/auth-context';
import { fetchAddresses } from '../../../lib/api';
import Spinner from '../../ui/spinner/Spinner';
import useHttp, { Status } from '../../../hooks/use-http';
import styles from '../Profile.module.css';

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
        <div className={styles.profile}>
          <table>
            <thead>
              <th>Recipient Name</th>
              <th>Street</th>
              <th>Appartment</th>
            </thead>
            {data.map((address, index) => (
              <tr key={`address_${index}`}>
                <td>{address.name}</td>
                <td>{`${address.house} ${address.street}`}</td>
                <td>{address.appartment}</td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </>
  );
};

export default KnownAddresses;

import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { getLatestAdverts } from './service';
import Button from '../shared/Button';
import { logout } from '../auth/service';
import Layout from '../Layout/Layout';

// eslint-disable-next-line react/prop-types
const AdvertsPage = ({ onLogout }) => {
  const [adverts, setAdverts] = useState([]);

  useEffect(() => {
    getLatestAdverts().then(adverts => setAdverts(adverts));
  }, []);

  const handleClick = async () => {
    await logout();
    onLogout();
  };

  return (
    <Layout title="Adverts List">
      <div className={styles.advertsPage}>
        {/* eslint-disable-next-line no-extra-boolean-cast */}
        {!!adverts.length ? (
          <ul>
            {adverts.map(advert => (
              <li key={advert.id}>
                `{advert.productname}
                {advert.message}
                {advert.price} Euros`
              </li>
            ))}
          </ul>
        ) : (
          <Button>Be the first!</Button>
        )}
      </div>
    </Layout>
  );
};

export default AdvertsPage;

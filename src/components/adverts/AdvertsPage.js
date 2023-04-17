import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { getLatestAdverts } from './service';
import Button from '../shared/Button';
import { logout } from '../auth/service';

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
    <div className={styles.advertsPage}>
      <Button onClick={handleClick}>Logout</Button>
      <ul>
        {adverts.map(advert => (
          <li key={advert.id}>
            `{advert.productname}
            {advert.message}
            {advert.price} Euros`
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdvertsPage;

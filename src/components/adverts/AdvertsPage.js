import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { getLatestAdverts } from './service';
import Button from '../shared/Button';
import Layout from '../Layout/Layout';
import { Link } from 'react-router-dom';

const EmptyList = () => (
  <div>
    <p>Be the first!</p>
    <Button as={Link} to="/adverts/new">
      Create Add
    </Button>
  </div>
);

// eslint-disable-next-line react/prop-types
const AdvertsPage = props => {
  const [adverts, setAdverts] = useState([]);

  useEffect(() => {
    getLatestAdverts().then(adverts => setAdverts(adverts));
  }, []);

  return (
    <Layout title="Adverts List" {...props}>
      <div className={styles.advertsPage}>
        {/* eslint-disable-next-line no-extra-boolean-cast */}
        {!!adverts.length ? (
          <ul>
            {adverts.map(advert => (
              <li key={advert.id}>
                <Link to={`/adverts/${advert.id}`}>
                  `{advert.productname}
                  {advert.message}
                  {advert.price} Euros`
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyList />
        )}
      </div>
    </Layout>
  );
};

export default AdvertsPage;

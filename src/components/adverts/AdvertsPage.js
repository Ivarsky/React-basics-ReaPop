import { useEffect, useState } from 'react';
//import styles from './styles.module.css';
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
const AdvertsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [adverts, setAdverts] = useState([]);
  const [filter, setfilter] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const adverts = await getLatestAdverts();
      setAdverts(adverts);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const filteredAdverts =
    filter === undefined
      ? adverts
      : adverts.filter(advert => advert.sell === filter);

  return (
    <Layout title="Adverts List">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {/* eslint-disable-next-line no-extra-boolean-cast */}
          {!!adverts.length ? (
            <>
              <div>
                <label>Sell</label>
                <input
                  type="radio"
                  name="filter"
                  value={true}
                  onChange={event => setfilter(!!event.target.value)}
                />

                <label>Buy</label>
                <input
                  type="radio"
                  name="filter"
                  value={true}
                  onChange={event => setfilter(!event.target.value)}
                />

                <label>All</label>
                <input
                  type="radio"
                  name="filter"
                  checked={filter === undefined}
                  value={undefined}
                  onChange={() => setfilter(undefined)}
                />
              </div>
              <ul>
                {filteredAdverts.map(advert => (
                  <li key={advert.id}>
                    <Link
                      to={`/adverts/${advert.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      `{advert.productname}: {advert.message} {advert.price}{' '}
                      Euros`
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <EmptyList />
          )}
        </div>
      )}
    </Layout>
  );
};
export default AdvertsPage;

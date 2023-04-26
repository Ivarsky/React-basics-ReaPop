/* eslint-disable no-undef */
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

const AdvertsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [adverts, setAdverts] = useState([]);
  const [filterBySale, setFilterBySale] = useState(undefined);
  const [tagFilter, setTagFilter] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const adverts = await getLatestAdverts();
      setAdverts(adverts);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const addsFilteredBySale =
    filterBySale === undefined
      ? adverts
      : adverts.filter(advert => advert.sale === filterBySale);

  const handleChangeTagFilter = event => {
    const value = event.target.value === 'All' ? undefined : event.target.value;
    setTagFilter(value);
  };

  const addsFilteredByTags =
    tagFilter === undefined
      ? addsFilteredBySale
      : addsFilteredBySale.filter(advert => advert.tags[0] === tagFilter);
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
                  onChange={event => setFilterBySale(!!event.target.value)}
                />

                <label>Buy</label>
                <input
                  type="radio"
                  name="filter"
                  onChange={event => setFilterBySale(!event.target.value)}
                />

                <label>All</label>
                <input
                  type="radio"
                  name="filter"
                  checked={filterBySale === undefined}
                  onChange={() => setFilterBySale(undefined)}
                />
              </div>
              <div>
                <label>Filter by Tag</label>
                <select
                  name="tagFilter"
                  value={tagFilter}
                  onChange={handleChangeTagFilter}
                >
                  <option value={undefined}>All</option>
                  <option value={'lifestyle'}>Lifestyle</option>
                  <option value={'mobile'}>Mobile</option>
                  <option value={'motor'}>Motor</option>
                  <option value={'work'}>Work</option>
                </select>
              </div>
              <ul>
                {addsFilteredByTags.map(advert => (
                  <li key={advert.id}>
                    <img src={`${advert.photo}`} placeholder="" />
                    <Link
                      to={`/adverts/${advert.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      `{advert.name}: {advert.price} Euros`
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

import { useEffect, useState } from 'react';
import styles from  './styles.module.css';
import { getLatestAdverts } from './service';



const AdvertsPage = () => {

  const [adverts, setAdverts] = useState([]);
  
  useEffect(()=>{
    getLatestAdverts().then(adverts => setAdverts(adverts));

  }, []);


  return (
    <div className = {styles.advertsPage}>
      <ul>
        {
          adverts.map(advert =>
            <li key={advert.id}>
              `{advert.productname}
              {advert.message}
              {advert.price} Euros`
            </li>)
        }
      </ul>
    </div>
  );
};

export default AdvertsPage;
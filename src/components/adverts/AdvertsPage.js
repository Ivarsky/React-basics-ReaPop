import styles from  './styles.module.css';

console.log(styles);
const adverts = [
  {
    productname: 
    'Nave espacial',
    message: 'No usada fuera del sistema solar',
    userId: 1,
    price: 500000,
    sell: true,
    id: 1,
  },
  {
    productname: 
    'Mr.Meeseeks box',
    message: 'Se busca una mr.meeseeks box',
    userId: 1,
    price: 1000000,
    sell: false,
    id: 2,
  },
];

const AdvertsPage = () => {
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
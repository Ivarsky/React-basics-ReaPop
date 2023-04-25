import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { useEffect, useState } from 'react';
import { deleteAdvert, getAdvert } from './service';
import Button from '../shared/Button';

const AdvertPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  //const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [advert, setAdvert] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const advert = await getAdvert(params.advertId);
        setAdvert(advert);
        setIsLoading(false);
      } catch (error) {
        if (error.status === 404) {
          return navigate('/404');
        }
        //setError(error);
      }
    }
    fetchData();
  }, [params.advertId, navigate]);

  const handleSubmit = async event => {
    event.preventDefault();
    //TODO: trycatch y confirmacion
    await deleteAdvert(params.advertId);
    const to = '/';
    navigate(to);
  };

  //TODO: MAQUETACION
  return (
    <Layout title="Advert detail">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {advert && (
            <div>
              <img src={`${advert.photo}`} />
              {`${advert.name}, 
            a ${advert.price} euros
              Tag: ${advert.tags}`}
            </div>
          )}
        </div>
      )}
      <Button type="submit" onClick={handleSubmit}>
        DELETE
      </Button>
    </Layout>
  );
};

export default AdvertPage;

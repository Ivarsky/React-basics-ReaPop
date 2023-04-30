import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { useEffect, useState } from 'react';
import { deleteAdvert, getAdvert } from './service';
import { Alert, Button, Card, Spinner } from 'react-bootstrap';
import placeholderPhoto from '../../assets/placeholder.png';

const AdvertPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  //const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [advert, setAdvert] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

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
        if (error.status === 401) {
          return navigate('/login');
        }
        //setError(error);
      }
    }
    fetchData();
  }, [params.advertId, navigate]);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await deleteAdvert(params.advertId);
      setIsLoading(false);
      const to = '/';
      navigate(to);
    } catch (error) {
      if (error.status === 404) {
        return navigate('/404');
      }
    }
    console.log(event);
  };

  return (
    <Layout title="Advert detail">
      {isLoading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <div className="d-flex justify-content-center mt-4">
          <Card
            className="d-flex align-items-center"
            style={{ maxWidth: '500px' }}
          >
            <Card.Img
              variant="top"
              src={advert.photo ? advert.photo : placeholderPhoto}
              style={{ maxWidth: '400px' }}
            />
            <Card.Body>
              <Card.Text>
                {advert.sale ? 'Selling ' : 'Looking for '}{' '}
                {`${advert.name} ${advert.sale ? ' at ' : ' offering '} ${
                  advert.price
                } euros, Tag: ${advert.tags}`}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      )}
      {!showAlert ? (
        <Button variant="warning" onClick={() => setShowAlert(true)}>
          DELETE
        </Button>
      ) : (
        <Alert variant="danger">
          <Alert.Heading>DELETING ADVERT!</Alert.Heading>
          <p>
            By clicking continue you agree to delete PERMANENTLY this advert if
            this was not your intention click Close
          </p>
          <div className="d-flex justify-content-center">
            <form onSubmit={handleSubmit}>
              <Button type="submit" variant="danger" className="mx-5">
                Continue
              </Button>
              <Button
                variant="success"
                onClick={() => setShowAlert(false)}
                className="mx-5"
              >
                Close
              </Button>
            </form>
          </div>
        </Alert>
      )}
    </Layout>
  );
};

export default AdvertPage;

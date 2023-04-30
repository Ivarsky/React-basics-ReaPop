import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { Button, Form } from 'react-bootstrap';
import { createAdvert } from './service';
import { useState } from 'react';

const NewAdvertPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [nameContent, setNameContent] = useState('');
  const [priceContent, setPriceContent] = useState('');
  const [sellContent, setSellContent] = useState('');
  const [tagContent, setTagContent] = useState('lifestyle');
  const [photoContent, setPhotoContent] = useState('');

  const handleChangeName = event => {
    setNameContent(event.target.value);
  };

  const handleChangePrice = event => {
    setPriceContent(event.target.value);
  };

  const handleChangeSell = event => {
    setSellContent(event.target.value);
  };

  const handleChangeTag = event => {
    setTagContent(event.target.value);
  };

  const handleChangePhoto = event => {
    setPhotoContent(event.target.value);
    console.log(event.target.value);
  };

  const isDisabled =
    !nameContent || !priceContent || !sellContent || !tagContent || isLoading;

  const handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData(event.target);

    try {
      setIsLoading(true);
      const advert = await createAdvert(data, {
        headers: { 'content-type': 'multipart/form-data' },
      });
      setIsLoading(false);
      navigate(`/adverts/${advert.id}`);
    } catch (error) {
      if (error.status === 401) {
        navigate('/login');
      }
    }
    console.log(
      nameContent,
      priceContent,
      sellContent,
      tagContent,
      photoContent,
    );
  };

  const buttonText = isLoading ? 'Loading' : 'Submit!';

  //TODO: CARGA LOS TAGS DESDE EL ENDPOINT NO LOS HARDCODEES.

  return (
    <Layout title="Publish your advert!">
      <div>
        <Form
          onSubmit={handleSubmit}
          style={{ maxWidth: '500px' }}
          className="mx-auto"
        >
          <Form.Group className="mb-3">
            <Form.Label>Product name</Form.Label>
            <Form.Control
              placeholder="Insert product name"
              name="name"
              onChange={handleChangeName}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Price in EUR"
              name="price"
              onChange={handleChangePrice}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Select image</Form.Label>
            <Form.Control
              type="file"
              name="photo"
              onChange={handleChangePhoto}
            />
          </Form.Group>
          <Form.Group className="d-flex justify-content-center">
            <Form.Check
              type="radio"
              name="sale"
              value={true}
              onChange={handleChangeSell}
              label="Sell"
              className="mx-2"
            />
            <Form.Check
              type="radio"
              name="sale"
              value={false}
              onChange={handleChangeSell}
              label="Buy"
              className="mx-2"
            />
            <Form.Label className="mx-2">Tags:</Form.Label>
            <Form.Control
              className="mx-2 mb-4"
              as="select"
              name="tags"
              onChange={handleChangeTag}
            >
              <option value="lifestyle">Lifestyle</option>
              <option value="mobile">Mobile</option>
              <option value="motor">Motor</option>
              <option value="work">Work</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="Submit" disabled={isDisabled}>
            {buttonText}
          </Button>
        </Form>
      </div>
    </Layout>
  );
};

export default NewAdvertPage;

import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Button from '../shared/Button';
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
        <form onSubmit={handleSubmit}>
          <div>
            <input
              placeholder="Product name"
              name="name"
              onChange={handleChangeName}
            ></input>
          </div>
          <div>
            <input
              type="number"
              step={0.01}
              placeholder="Price in EUR"
              name="price"
              onChange={handleChangePrice}
            ></input>
          </div>
          <div>
            <label>Select image</label>
            <input
              type="file"
              name="photo"
              onChange={handleChangePhoto}
            ></input>
          </div>
          <div>
            <label>Sell</label>
            <input
              type="radio"
              name="sale"
              value={true}
              onChange={handleChangeSell}
            ></input>
            <label>Buy</label>
            <input
              type="radio"
              name="sale"
              value={false}
              onChange={handleChangeSell}
            ></input>
          </div>
          <div>
            <label>Tags</label>
            <select name="tags" onChange={handleChangeTag}>
              <option value={'lifestyle'}>Lifestyle</option>
              <option value={'mobile'}>Mobile</option>
              <option value={'motor'}>Motor</option>
              <option value={'work'}>Work</option>
            </select>
          </div>
          <div>
            <Button type="submit" disabled={isDisabled}>
              {buttonText}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default NewAdvertPage;

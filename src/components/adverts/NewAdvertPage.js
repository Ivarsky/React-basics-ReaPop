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
  const [tagContent, setTagContent] = useState('');
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
    console.log(tagContent);
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
          <label>Lifestyle</label>
          <input
            type="radio"
            name="tags"
            value={'lifestyle'}
            onChange={handleChangeTag}
          ></input>
          <label>Mobile</label>
          <input
            type="radio"
            name="tags"
            value={'mobile'}
            onChange={handleChangeTag}
          ></input>
          <label>Motor</label>
          <input
            type="radio"
            name="tags"
            value={'motor'}
            onChange={handleChangeTag}
          ></input>
          <label>Work</label>
          <input
            type="radio"
            name="tags"
            value={'work'}
            onChange={handleChangeTag}
          ></input>
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

import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Button from '../shared/Button';
import Textarea from '../shared/Textarea';
import { createAdvert } from './service';
import { useState } from 'react';

const MIN_CHARACTERS = 10;
const MAX_CHARACTERS = 140;

const NewAdvertPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [nameContent, setNameContent] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [priceContent, setPriceContent] = useState('');
  const [sellContent, setSellContent] = useState('');

  const handleChangeName = event => {
    setNameContent(event.target.value);
  };

  const handleChangeMessage = event => {
    setMessageContent(event.target.value);
  };

  const handleChangePrice = event => {
    setPriceContent(event.target.value);
  };

  const handleChangeSell = event => {
    setSellContent(event.target.value);
  };

  const isDisabled =
    !nameContent ||
    !messageContent ||
    !priceContent ||
    !sellContent ||
    isLoading;

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const advert = await createAdvert({
        //TODO: quitar el updated at
        productname: nameContent,
        message: messageContent,
        price: priceContent,
        sell: !!sellContent,
      });
      setIsLoading(false);
      navigate(`/adverts/${advert.id}`);
    } catch (error) {
      if (error.status === 401) {
        navigate('/login');
      }
    }
  };
  console.log(nameContent, messageContent, priceContent, sellContent);

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
            <Textarea
              minLength={MIN_CHARACTERS}
              maxLength={MAX_CHARACTERS}
              placeholder="Description"
              name="message"
              onChange={handleChangeMessage}
            />
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
            <label>Sell</label>
            <input
              type="radio"
              name="sell"
              value={true}
              onChange={handleChangeSell}
            ></input>
            <label>Buy</label>
            <input
              type="radio"
              name="sell"
              value={false}
              onChange={handleChangeSell}
            ></input>
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

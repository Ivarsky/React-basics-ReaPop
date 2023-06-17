import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { advertCreate } from "../../store/actions";
import { getTags, getUi } from "../../store/selectors";

const NewAdvertPage = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(getUi);
  const navigate = useNavigate();
  const [nameContent, setNameContent] = useState("");
  const [priceContent, setPriceContent] = useState("");
  const [sellContent, setSellContent] = useState("");
  const tags = [useSelector(getTags)];
  const [tagContent, setTagContent] = useState(tags[0]);

  const handleChangeName = (event) => {
    setNameContent(event.target.value);
  };

  const handleChangePrice = (event) => {
    setPriceContent(event.target.value);
  };

  const handleChangeSell = (event) => {
    setSellContent(event.target.value);
  };

  const handleChangeTag = (event) => {
    setTagContent(event.target.value);
  };

  const isDisabled =
    !nameContent || !priceContent || !sellContent || !tagContent || isLoading;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    try {
      const advert = await dispatch(
        advertCreate(data, {
          headers: { "content-type": "multipart/form-data" },
        })
      );
      navigate(`/adverts/${advert.id}`);
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  const buttonText = isLoading ? "Loading" : "Submit!";

  return (
    <Layout title="Publish your advert!">
      <div>
        <Form
          onSubmit={handleSubmit}
          style={{ maxWidth: "500px" }}
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
            <Form.Control type="file" name="photo" />
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
              <option value={tags[0]}>Lifestyle</option>
              <option value={tags[1]}>Mobile</option>
              <option value={tags[2]}>Motor</option>
              <option value={tags[3]}>Work</option>
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

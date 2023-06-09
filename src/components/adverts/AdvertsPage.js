/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useEffect, useState } from "react";
//import styles from './styles.module.css';
import { Button, Card, CardGroup, Spinner } from "react-bootstrap";
import Layout from "../Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import placeholderPhoto from "../../assets/placeholder.png";
import { connect } from "react-redux";
import { getAdverts, getUi } from "../../store/selectors";
import { advertsLoaded } from "../../store/actions";

const EmptyList = () => (
  <div>
    <p>Be the first!</p>
    <Button as={Link} to="/adverts/new">
      Create Add
    </Button>
  </div>
);

const AdvertsPage = ({ adverts, onAdvertsLoaded, isLoading }) => {
  const [saleFilter, setSaleFilter] = useState(undefined);
  const [tagFilter, setTagFilter] = useState(undefined);

  useEffect(() => {
    onAdvertsLoaded();
  }, [onAdvertsLoaded]);

  const handleChangeTagFilter = (event) => {
    const value = event.target.value === "All" ? undefined : event.target.value;
    setTagFilter(value);
  };

  function filterAdverts(adverts, saleFilter, tagFilter) {
    return adverts.filter(
      (advert) =>
        (saleFilter === undefined || advert.sale === saleFilter) &&
        (tagFilter === undefined || advert.tags[0] === tagFilter)
    );
  }
  const filteredAdverts = filterAdverts(adverts, saleFilter, tagFilter);

  return (
    <Layout title="Adverts List">
      {isLoading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <div>
          {/* eslint-disable-next-line no-extra-boolean-cast */}
          {!!adverts.length ? (
            <>
              <div className="Filters">
                <div>
                  <label>Sell</label>
                  <input
                    type="radio"
                    name="filter"
                    onChange={(event) => setSaleFilter(!!event.target.value)}
                  />

                  <label>Buy</label>
                  <input
                    type="radio"
                    name="filter"
                    onChange={(event) => setSaleFilter(!event.target.value)}
                  />

                  <label>All</label>
                  <input
                    type="radio"
                    name="filter"
                    checked={saleFilter === undefined}
                    onChange={() => setSaleFilter(undefined)}
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
                    <option value={"lifestyle"}>Lifestyle</option>
                    <option value={"mobile"}>Mobile</option>
                    <option value={"motor"}>Motor</option>
                    <option value={"work"}>Work</option>
                  </select>
                </div>
              </div>
              <ul>
                <div className="Advert">
                  <CardGroup>
                    {filteredAdverts.map((advert) => (
                      <Link
                        to={`/adverts/${advert.id}`}
                        style={{ textDecoration: "none" }}
                        key={advert.id}
                      >
                        <Card style={{ width: "18rem" }} className="mb-5 mx-2">
                          <Card.Img
                            variant="top"
                            src={advert.photo ? advert.photo : placeholderPhoto}
                          />
                          <Card.Body>
                            <Card.Title>{advert.name}</Card.Title>
                            <Card.Text>
                              {advert.sale ? "Selling " : "Looking for "}
                              {advert.name} at {advert.price} Eur
                              <br />
                              {`Tags: ${advert.tags}`}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Link>
                    ))}
                  </CardGroup>
                </div>
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

const mapStateToProps = (state) => ({
  adverts: getAdverts(state),
  ...getUi(state),
});
//TODO:borra comment
//const mapDispatchToProps = dispatch => ({
//  onAdvertsLoaded: adverts => dispatch(advertsLoaded(adverts))
//});

const mapDispatchToProps = {
  onAdvertsLoaded: advertsLoaded,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvertsPage);

import { getAdvert } from "../selectors";

describe("getAdvert", () => {
  test("should return an advert by advertId", () => {
    const advertId = "e991f557-803b-4e25-bc5c-761ce5275fdb";
    const adverts = [{ id: advertId }];
    const state = { adverts: { data: adverts } };
    expect(getAdvert(advertId)(state)).toBe(adverts[0]);
  });

  test("should not return any advert", () => {
    const advertId = "e991f557-803b-4e25-bc5c-761ce5275fdb";
    const adverts = [];
    const state = { adverts: { data: adverts } };
    expect(getAdvert(advertId)(state)).toBeUndefined();
  });
});

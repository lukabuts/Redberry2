export type realEstateType = {
  address: string;
  area: number;
  bedrooms: number;
  city_id: number;
  city: {
    id: number;
    name: string;
    region: {
      id: number;
      name: string;
    };
    region_id: number;
  };
  id: number;
  image: string;
  is_rental: 0 | 1;
  price: number;
  zip_code: string;
};

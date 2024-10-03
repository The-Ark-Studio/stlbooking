import dayjs from 'dayjs';

export interface IDataFormType {
  facility: string;
  date: dayjs.Dayjs | null;
  adults: number;
  children: number;
  infants: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  checkinTime: dayjs.Dayjs | null;
  checkoutTime: dayjs.Dayjs | null;
  extraServices: {
    airportPickup: boolean;
    spaManicure: boolean;
    tourPackage: boolean;
  };
  notes: string;
}

export interface IBasePriceRange {
  key: string | number;
  adultPrice: string;
  childrenPrice: string;
  underPrice: string;
}

export interface IExtraHours {
  key: string | number;
  fiveHours: string;
  sevenHours: string;
  nineHours: string;
  elevenHours: string;
}

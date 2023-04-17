import { ProductI } from "./products.interface";
import { SlideI } from "./slide";
export interface LocalDataI {
  type: string;
  id: string;
  name: string;
  url?: string;
  method?: string;
  data?: Array<LocalDataDI | ProductI | SlideI>;
}

export interface LocalDataDI {
  id: string;
  name: string;
  url: string;
  icon: string;
}

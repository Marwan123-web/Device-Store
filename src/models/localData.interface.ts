import { ProductI } from "./products.interface";
import { SlideI } from "./slide.interface";
import { TMemberI } from "./teamMembers.interface";
export interface LocalDataI {
  type: string;
  id: string;
  name: string;
  url?: string;
  method?: string;
  data?: Array<LocalDataDI | ProductI | SlideI | TMemberI>;
}

export interface LocalDataDI {
  id: string;
  name: string;
  url: string;
  icon: string;
}

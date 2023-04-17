export interface LocalDataI {
  type: string;
  id: string;
  name: string;
  url: string;
  method: string;
  data: Array<LocalDataDI>;
}

export interface LocalDataDI {
  id: string;
  name: string;
  url: string;
  icon: string;
}

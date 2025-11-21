export interface ContratoUsuarioResponse {
  responseCode: string;
  data: ContratoUsuarioDataWrapper;
  errorMessage: string | null;
}

export interface ContratoUsuarioDataWrapper {
  responseCode: string | null;
  data: ContratoUsuario[];
  errorMessage: string | null;
}

export interface ContratoUsuario {
  id: number;
  signatureDate: string; // luego convertimos a Date si queremos
  endDate: string;
  amount: number;
  idProperty: IDProperty;
  idUser: IDUser;
  idTypeContract: IDTypeContract;
}

export interface IDProperty {
  id: number;
  environments: number;
  dimensions: number;
  value: number;
  description: string;
  image: string;
  idSection: IDSection;
  idTypeProperty: IDTypeProperty;
  idUser: IDUser;
}

export interface IDSection {
  id: number;
  name: string;
  location: string;
  idUser: IDUser;
}

export interface IDUser {
  idUser: number;
  name: string;
  usename: string; // se mantiene como está, viene mal escrito del backend
  password: string;
  email: string;
  phone: string;
  pwLastUpdate: string | null;
  salt: string;
  ci: string;
}

export interface IDTypeContract {
  id: number;
  type: string;
}

export interface IDTypeProperty {
  id: number;
  type: string;
}

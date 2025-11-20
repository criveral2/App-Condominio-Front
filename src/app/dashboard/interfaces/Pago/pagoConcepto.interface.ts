export interface PagoConceptoResponse {
  responseCode: string;
  data: PagoConceptoData;
  errorMessage: string | null;
}

export interface PagoConceptoData {
  payments: PagoConcepto[];
  totalAmount: number;
}

export interface PagoConcepto {
  id: number;
  amount: string;
  date: string;
  detail: string;
  idUserPays: number;
  nameUserPays: string;
  idUserReceives: number;
  nameUserReceives: string;
  idConcept: string;
}

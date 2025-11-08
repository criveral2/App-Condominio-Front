export interface Pago {
    responseCode: string;
    data:         PagoData[];
    errorMessage: null;
}

export interface PagoData {
    id:               number;
    amount:           string;
    date:             Date;
    detail:           string;
    idUserPays:       number;
    nameUserPays:     string;
    idUserReceives:   number;
    nameUserReceives: string;
    idConcept:        string;
}

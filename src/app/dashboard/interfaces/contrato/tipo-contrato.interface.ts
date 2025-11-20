export interface TipoContrato {
    responseCode: string;
    data:         TipoContratoData[];
    errorMessage: null;
}

export interface TipoContratoData {
    id:   number;
    type: string;
}

export interface TipoPropiedad {
    responseCode: string;
    data:         TipoPropiedadData[];
    errorMessage: null;
}

export interface TipoPropiedadData {
    id:   number;
    type: string;
}

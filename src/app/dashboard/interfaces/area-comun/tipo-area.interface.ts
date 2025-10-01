export interface TipoArea {
    responseCode: string;
    data:         TipoAreaData[];
    errorMessage: null;
}

export interface TipoAreaData {
    id:   number;
    type: string;
}

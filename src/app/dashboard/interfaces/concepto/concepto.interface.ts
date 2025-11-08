export interface Concepto {
    responseCode: string;
    data:         ConceptoData[];
    errorMessage: null;
}

export interface ConceptoData {
    id:   number;
    name: string;
}

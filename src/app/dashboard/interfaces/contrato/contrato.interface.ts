export interface Contrato {
    responseCode: string;
    data:         ContratoData[];
    errorMessage: null;
}

export interface ContratoData {
    id:                    number;
    contractSignatureDate: Date;
    contractEndDate:       Date;
    contractAmount:        number;
    contractType:          number;
    contractProperty:      number;
    contractUser:          number;
    contractOwner:         string;
}

export interface CreateContrato {
    signatureDate: Date;
    endDate:       Date;
    amount:        number;
    idProperty:    number;
    idType:        number;
}

export interface UpdateContrato {
    responseCode: string;
    data:         UpdateContratoData;
    errorMessage: null;
}

export interface UpdateContratoData {
    id:                    number;
    contractSignatureDate: Date;
    contractEndDate:       Date;
    contractAmount:        number;
    contractType:          number;
    contractProperty:      number;
    contractUser:          number;
    contractOwner:         string;
}


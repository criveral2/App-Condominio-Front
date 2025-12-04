export interface Propiedad {
    responseCode: string;
    data:         PropiedadData[];
    errorMessage: null;
}

export interface PropiedadData {
    id:                   number;
    propertyEnvironments: number;
    propertyDimensions:   number;
    propertyValue:        number;
    propertyDescription:  string;
    propertyImage:        string;
    propertyIdSection:    number;
    propertyType:         string;
    propertyOwner:        string;
    userId:               number;
}

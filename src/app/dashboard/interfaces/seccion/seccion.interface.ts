export interface Seccion {
    responseCode: null;
    data:         SeccionData[];
    errorMessage: string;
}

export interface SeccionData {
    id?:       number;
    name:     string;
    location: string;
    idUser:   number;
}

export interface AreaComun {
    responseCode: string;
    data:         AreaComunData[];
    errorMessage: null;
}

export interface AreaComunData {
    id:                    number;
    commonAreaDescription: string;
    commonAreaSection:     number;
    commonAreaTypeArea:    string;
}

// Para enviar datos (POST)
export interface AreaComunCreate {
  description: string;
  idSection: number;
  idTypeArea: string;
}



export interface ActualizaContrasenia {
    idUser:      number;
    newPassword: string;
}

export interface RespuestaActualizaContrasenia {
    responseCode: string;
    data:         string;
    errorMessage: null;
}

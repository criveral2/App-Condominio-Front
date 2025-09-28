export interface UpdateUser {
    responseCode: string;
    data:         UpdateUserData;
    errorMessage: null;
}

export interface UpdateUserData {
    idUser:          number;
    name:            string;
    usename:         string;
    email:           string;
    phone:           string;
    typeUser:        string;
    warnings:        null;
    roleAssignation: null;
    ci:              string;
}

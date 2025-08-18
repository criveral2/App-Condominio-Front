

export interface User {
    idUser:          number;
    name:            string;
    usename:         string;
    email:           string;
    phone:           string;
    typeUser:        string;
    warnings:        any[];
    roleAssignation: RoleAssignation;
    ci:              string;
}

export interface RoleAssignation {
    name:       string;
    privileges: Privileges;
}

export interface Privileges {
    CommonAreas: string;
    Posts:       string;
    Payments:    string;
    Users:       string;
    Properties:  string;
    Contracts:   string;
}

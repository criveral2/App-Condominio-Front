

export interface Roles {
    responseCode: string;
    data:         Datum[];
    errorMessage: null;
}

export interface Datum {
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

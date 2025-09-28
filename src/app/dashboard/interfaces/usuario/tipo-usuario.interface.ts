export interface RoleType {
    responseCode: string;
    data:         Datum[];
    errorMessage: null;
}

export interface Datum {
    id:         number;
    permission: string;
}

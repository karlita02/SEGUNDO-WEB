// Generated by https://quicktype.io

export interface IResParqueo {
    sum:     number;
    parqueos: Parqueo[];
}

export interface Parqueo {
    _id?:    string;
    fecha: string;
    status?: boolean;
    hora: string;
    fechafin:  string;
    horafin: string;
    category?:  number;
    __v?:    number;
}

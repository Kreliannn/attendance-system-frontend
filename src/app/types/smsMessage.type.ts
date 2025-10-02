import { studentInterface } from "./student.type"

export interface insertSmsMessageInterface {
    student: string
    message : string,
    date : string,
}


export interface smsMessageInterface {
    _id : string,
    student: studentInterface
    message : string,
    date : string,
}

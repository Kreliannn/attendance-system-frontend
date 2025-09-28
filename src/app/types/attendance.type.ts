import { studentInterface } from "./student.type"

export interface insertAttendanceInterface {
    student: string
    status : string,
    date : string,
}


export interface attendanceInterface {
    _id : string,
    student: studentInterface
    status : string,
    date : string,
}

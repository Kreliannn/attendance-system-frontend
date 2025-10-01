import * as XLSX from "xlsx";
import { studentInterface } from "../types/student.type";
import { attendanceInterface } from "../types/attendance.type";

export function exportAttendanceToExcel() {
  const data = [
     { student: "John Doe", attendance: { "2025-09-01": "P", "2025-09-02": "A", "2025-09-03": "P" } },
     { student: "Jane Smith", attendance: { "2025-09-01": "P", "2025-09-02": "P", "2025-09-03": "P" } }
   ]
  const dates = ["2025-09-01", "2025-09-02", "2025-09-03"]

  // Build dynamic header row
  const header = ["Student", ...dates, "Total Present"];

  // Build rows
  const rows = data.map((d) => {
    const row = [d.student];
    let total = 0;
    dates.forEach((date) => {
            //@ts-ignore
      const status = d.attendance[date] || "-";
      if (status === "P") total++;
      row.push(status);
    });
    //@ts-ignore
    row.push(total);
    return row;
  });

  // Combine header + rows
  const worksheetData = [header, ...rows];

  // Create worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  // Create workbook and append sheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

  // Export file
  XLSX.writeFile(workbook, "attendance.xlsx");
}



export function test(students : studentInterface[], attendance : attendanceInterface[]) {

     const allDate = attendance.map((item) => item.date)
     const dates = [...new Set(allDate)];

    // Build dynamic header row
    const header = ["Student", ...dates, "Total Present"];

    const rows = students.map((student) => {
        const row: string[] = [student.name];
        let total = 0;
    
        dates.forEach((date) => {
          let status = "absent";
          attendance.forEach((item) => {
            if (item.student._id === student._id && item.date === date) {
              if (item.status === "present") {
                status = "present";
                total += 1;
              }
            }
          });
          row.push(status);
        });
    
        row.push(total.toString()); 
        return row; 
      });
    
    // Combine header + rows
    const worksheetData = [header, ...rows];
  
    // Create worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  
    // Create workbook and append sheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
  
    // Export file
    XLSX.writeFile(workbook, "attendance.xlsx");
  }
  
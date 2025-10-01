import * as XLSX from "xlsx";
import { studentInterface } from "../types/student.type";
import { attendanceInterface } from "../types/attendance.type";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export function exportAttendanceToPDF(students: studentInterface[], attendance: attendanceInterface[]) {
  const allDate = attendance.map((item) => item.date);
  const dates = [...new Set(allDate)];

  // Build header row
  const header = ["Student", ...dates, "Total Present"];

  // Build rows
  const rows = students.map((student) => {
    const row: string[] = [student.name];
    let total = 0;

    dates.forEach((date) => {
      let status = "no record";
      attendance.forEach((item) => {
        if (item.student._id === student._id && item.date === date) {
          if (item.status === "present") {
            status = "present";
            total += 1;
          } else {
            status = "absent";
          }
        }
      });
      row.push(status);
    });

    row.push(total.toString());
    return row;
  });

  // Generate PDF
  const doc = new jsPDF();

  // Title
  doc.setFontSize(16);
  doc.text("Attendance Report", 14, 15);

  // AutoTable
  autoTable(doc, {
    head: [header],
    body: rows,
    startY: 25,
    headStyles: { fillColor: [41, 128, 185] }, // blue header
  });

  // Save PDF
  doc.save("attendance.pdf");
}



export function exportAttendanceToExcel(
  students: studentInterface[],
  attendance: attendanceInterface[]
) {
  const allDate = attendance.map((item) => item.date);
  const dates = [...new Set(allDate)].sort(); // optional: sort dates

  // Build dynamic header row
  const header = ["Student", ...dates, "Total Present"];

  const rows = students.map((student) => {
    const row: string[] = [student.name];
    let total = 0;

    dates.forEach((date) => {
      let status = "no record";
      attendance.forEach((item) => {
        if (item.student._id === student._id && item.date === date) {
          if (item.status === "present") {
            status = "present";
            total += 1;
          } else {
            status = "absent";
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

  // ✅ Set column widths
  const colWidths = header.map((col, idx) => {
    if (idx === 0) return { wch: 20 }; // Student column wider
    if (col === "Total Present") return { wch: 15 };
    return { wch: 12 }; // date/status columns
  });

  worksheet["!cols"] = colWidths;

  // Create workbook and append sheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

  // Export file
  XLSX.writeFile(workbook, "attendance.xlsx");
}


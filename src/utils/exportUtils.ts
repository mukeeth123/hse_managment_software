import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

export function exportToCSV(filename: string, rows: Record<string, any>[]) {
  if (!rows || !rows.length) return;
  const separator = ',';
  const keys = Object.keys(rows[0]);
  const csvContent =
    keys.join(separator) +
    '\n' +
    rows
      .map((row) => {
        return keys
          .map((k) => {
            let cell = row[k] === null || row[k] === undefined ? '' : row[k];
            cell = cell instanceof Date ? cell.toLocaleString() : cell.toString();
            cell = cell.replace(/"/g, '""');
            if (cell.search(/("|,|\n)/g) >= 0) {
              cell = `"${cell}"`;
            }
            return cell;
          })
          .join(separator);
      })
      .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToExcel(filename: string, sheetName: string, data: Record<string, any>[]) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, `${filename}.xlsx`);
}

export function generateHSEPDFReport(title: string, subtitle: string, sections: { title: string; lines: string[] }[]) {
  const doc = new jsPDF();

  // Header Bar
  doc.setFillColor(7, 59, 47); // #073B2F Primary Dark Green
  doc.rect(0, 0, 210, 24, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('QHSE MANAGEMENT PLATFORM — QATAR', 14, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(221, 245, 234); // Mint
  doc.text('Client Organisation — Qatar Demonstration Environment', 14, 19);

  // Disclaimer banner
  doc.setFillColor(244, 247, 245);
  doc.rect(0, 24, 210, 10, 'F');
  doc.setTextColor(101, 117, 109);
  doc.setFontSize(7.5);
  doc.text('DEMONSTRATION REPORT — NOT ACTUAL CLIENT RECORDS | GENERATED IN BROWSER', 14, 30);

  // Report Title
  doc.setTextColor(23, 43, 37);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(title, 14, 44);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(101, 117, 109);
  doc.text(`${subtitle} | Generated on ${new Date().toLocaleString()}`, 14, 51);

  doc.setDrawColor(227, 234, 230);
  doc.setLineWidth(0.5);
  doc.line(14, 55, 196, 55);

  let currentY = 64;

  sections.forEach((sec) => {
    if (currentY > 260) {
      doc.addPage();
      currentY = 20;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(7, 59, 47);
    doc.text(sec.title, 14, currentY);
    currentY += 7;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(23, 43, 37);

    sec.lines.forEach((line) => {
      if (currentY > 275) {
        doc.addPage();
        currentY = 20;
      }
      const splitText = doc.splitTextToSize(line, 182);
      doc.text(splitText, 14, currentY);
      currentY += splitText.length * 5;
    });

    currentY += 4;
  });

  // Footer on each page
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(140, 150, 145);
    doc.text(`Page ${i} of ${pageCount} — Qatar Statutory HSE Compliance Verification`, 14, 290);
    doc.text('QHSE Platform Confidential', 160, 290);
  }

  doc.save(`${title.replace(/[^a-zA-Z0-9]/g, '_')}_Report.pdf`);
}

import React from "react";
import { jsPDF } from "jspdf";

const PdfGenerator = ({ reportArray }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text("Mental Health Report", 10, 10);

    // Add content from the report array
    let yOffset = 20;
    reportArray.forEach((item) => {
      doc.setFontSize(14);
      doc.text(`${item.key}:`, 10, yOffset);
      yOffset += 10;

      if (typeof item.value === "object" && !Array.isArray(item.value)) {
        // For nested objects (like Analysis Results)
        Object.entries(item.value).forEach(([subKey, subValue]) => {
          if (typeof subValue === "object") {
            doc.setFontSize(12);
            doc.text(`  ${subKey}:`, 10, yOffset);
            yOffset += 10;

            Object.entries(subValue).forEach(([subSubKey, subSubValue]) => {
              doc.setFontSize(10);
              doc.text(`    ${subSubKey}: ${subSubValue}`, 10, yOffset);
              yOffset += 10;
            });
          } else {
            doc.setFontSize(12);
            doc.text(`  ${subKey}: ${subValue}`, 10, yOffset);
            yOffset += 10;
          }
        });
      } else if (Array.isArray(item.value)) {
        // For arrays (like Recommendations)
        item.value.forEach((subItem) => {
          doc.setFontSize(12);
          doc.text(`  - ${subItem}`, 10, yOffset);
          yOffset += 10;
        });
      } else {
        // For simple key-value pairs
        doc.setFontSize(12);
        doc.text(`  ${item.value}`, 10, yOffset);
        yOffset += 10;
      }
      yOffset += 10; // Add some space between sections
    });

    // Save and download the PDF
    doc.save("Mental_Health_Report.pdf");
  };

  return (
    <div>
      <button onClick={generatePDF}>Download PDF</button>
    </div>
  );
};

export default PdfGenerator;

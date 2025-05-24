import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Letters = () => {
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    fetchLetters();
  }, []);

  const fetchLetters = async () => {
    try {
      const response = await fetch(`/api/letter/get`);
      if (!response.ok) {
        throw new Error(`Failed to fetch letters`);
      }
      const data = await response.json();
      console.log(data);
      setLetters(data);
    } catch (err) {
      console.log("Error fetching letters:", err);
    }
  };

  // Extract date from MongoDB ObjectId
  const getDateFromObjectId = (objectId) => {
    try {
      const timestamp = parseInt(objectId.substring(0, 8), 16);
      return new Date(timestamp * 1000).toLocaleDateString();
    } catch (e) {
      return 'N/A';
    }
  };

  const downloadPDF = () => {
    // Initialize jsPDF
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text("Letters Report", 14, 15);
    
    // Prepare data for the table
    const tableData = letters.map((letter, index) => [
      index + 1,
      letter.name,
      letter.email,
      getDateFromObjectId(letter._id)
    ]);

    // Add table using autoTable plugin
    autoTable(doc, {
      head: [['#', 'Name', 'Email', 'Date']],
      body: tableData,
      startY: 25,  // Start below the title
      styles: {
        fontSize: 9,
        cellPadding: 2,
        overflow: 'linebreak'
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { cellWidth: 10 },  // Sequence number column
        1: { cellWidth: 'auto' },  // Name column
        2: { cellWidth: 'auto' },  // Email column
        3: { cellWidth: 30 }  // Date column
      }
    });

    // Save the PDF
    doc.save('letters_report.pdf');
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Letters</h1>
        <button
          onClick={downloadPDF}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Download as PDF
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {letters.map((letter, index) => (
              <tr key={letter._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {letter.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {letter.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {getDateFromObjectId(letter._id)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Letters;
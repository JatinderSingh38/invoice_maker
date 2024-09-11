// // src/components/PDFViewerComponent.js
// import React, { useEffect, useState } from 'react';
// import { pdf } from '@react-pdf/renderer';
// import { Worker, Viewer } from '@react-pdf-viewer/core';
// import Invoice from './Invoice';

// const PDFViewerComponent = ({ invoiceData }) => {
//     const [pdfBlobUrl, setPdfBlobUrl] = useState(null);

//     useEffect(() => {
//         const generatePdf = async () => {
//             const doc = <Invoice invoiceData={invoiceData} />;
//             const pdfBlob = await pdf(doc).toBlob();
//             const url = URL.createObjectURL(pdfBlob);
//             setPdfBlobUrl(url);

//         };

//         generatePdf();
//     }, [invoiceData]);
//     const pdfjsVersion = '3.11.174';

//     return (
//         <div>
//             <h2>Invoice Preview</h2>
//             {pdfBlobUrl ? (
//                 <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}>
//                     <Viewer fileUrl={pdfBlobUrl} />
//                 </Worker>

//             ) : (
//                 <p>Loading PDF...</p>
//             )}
//         </div>
//     );
// };

// export default PDFViewerComponent;

// src/components/PDFViewerComponent.js
import React, { useEffect, useState, useRef } from 'react';
import { pdf } from '@react-pdf/renderer';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import Invoice from './Invoice';

const PDFViewerComponent = ({ invoiceData }) => {
    const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
    const pdfBlobUrlRef = useRef(null);

    useEffect(() => {
        const generatePdf = async () => {
            // Only generate PDF if invoiceData changes
            const doc = <Invoice invoiceData={invoiceData} />;
            const pdfBlob = await pdf(doc).toBlob();
            const url = URL.createObjectURL(pdfBlob);

            // Clean up previous URL
            if (pdfBlobUrlRef.current) {
                URL.revokeObjectURL(pdfBlobUrlRef.current);
            }

            setPdfBlobUrl(url);
            pdfBlobUrlRef.current = url;
        };

        generatePdf();
        console.log('PDFViewerComponent rendered');
        // Clean up URL on component unmount
        return () => {
            if (pdfBlobUrlRef.current) {
                URL.revokeObjectURL(pdfBlobUrlRef.current);
            }
        };

    }, []);

    const pdfjsVersion = '3.11.174';

    return (
        <div>
            <h2>Invoice Preview</h2>
            {pdfBlobUrl && (
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}>
                    <Viewer fileUrl={pdfBlobUrl} />
                </Worker>
            )}
        </div>
    );
};

export default PDFViewerComponent;

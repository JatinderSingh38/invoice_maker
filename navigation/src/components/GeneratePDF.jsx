// src/components/GeneratePDF.js
import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Invoice from './Invoice';

const GeneratePDF = ({ invoiceData }) => (
    <PDFDownloadLink
        document={<Invoice invoiceData={invoiceData} />}
        fileName={`invoice_${invoiceData.invoiceNumber}.pdf`}
    >
        {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download PDF'
        }
    </PDFDownloadLink>
);

export default GeneratePDF;

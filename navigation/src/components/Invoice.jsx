import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import numberToWords from 'number-to-words';
import logo from './aamazon-logo-1.png';

const styles = StyleSheet.create({
    page: {
        padding: 30,
        flexDirection: 'column',
    },
    lrHorizontal: {
        padding: 0,
        margin: 0,
        flexDirection: 'row',
    },
    leftSection: {
        width: '100%',
        padding: 0,
        marginBottom: 10,
    },
    rightSection: {
        width: '110%',
        padding: 0,
        marginBottom: 10,
    },
    middleSection: {
        width: '100%',
        padding: 10,
    },
    logo: {
        width: 120,
        height: 40,
        marginBottom: 10,
    },
    section: {
        marginBottom: 10,
    },
    heading: {
        fontSize: 17,
        marginBottom: 10,
        textAlign: 'right',
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
    },
    textLeft: {
        fontSize: 12,
        marginBottom: 5,
        textAlign: 'left',
        fontFamily: 'Helvetica',
    },
    boldTextLeft: {
        fontSize: 12,
        marginBottom: 5,
        textAlign: 'left',
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
    },
    textRight: {
        fontSize: 12,
        marginBottom: 5,
        textAlign: 'right',
        fontFamily: 'Helvetica',
    },
    table: {
        display: 'table',
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
        marginTop: 20,
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCol: {
        width: '7%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
        padding: 1,
    },
    tableColWide: {
        width: '45%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
        padding: 1,
    },
    tableCell: {
        fontSize: 10,
        textAlign: 'left',
        fontFamily: 'Helvetica',
    },
    tableCellRight: {
        fontSize: 10,
        textAlign: 'right',
        fontFamily: 'Helvetica',
    },
    uploadedImage: {
        width: 100,  // Adjust size as needed
        height: 50,
        marginTop: 10,
        marginLeft: 'auto',
    },
});

const Invoice = ({ invoiceData }) => {

    let totalItemAmount = 0;
    let totalShippingCharge = 0;


    invoiceData.items.forEach(item => {
        const isSamePlace = invoiceData.placeOfSupply === invoiceData.placeOfDelivery;
        let taxRate = parseFloat(item.taxRate) || 0;
        let taxType = '';
        let displayTaxRate = '';

        if (isSamePlace) {
            const halfTaxRate = taxRate / 2;
            displayTaxRate = `${halfTaxRate}%    ${halfTaxRate}% `;
            taxType = 'CGST   SGST';
        } else {
            displayTaxRate = `${taxRate}% IGST`;
            taxType = 'IGST';
        }

        const totalAmount = item.netAmount + (item.netAmount * taxRate) / 100;
        const shippingCharge = parseFloat(item.shippingCharge) || 0;

        const shiptotalAmount = shippingCharge + (shippingCharge * taxRate / 100);

        totalItemAmount += totalAmount;
        totalShippingCharge += shippingCharge;
    });


    const grandTotal = totalItemAmount + totalShippingCharge;
    const grandTotalInWords = numberToWords.toWords(grandTotal);
    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.lrHorizontal}>
                    <View style={styles.leftSection}>
                        <Image style={styles.logo} src={logo} />
                        <Text style={styles.boldTextLeft}></Text>
                        <Text style={styles.boldTextLeft}></Text>

                        <View style={styles.section}>
                            <Text style={styles.boldTextLeft}>Sold By:</Text>
                            <Text style={styles.textLeft}>{invoiceData.soldBy}</Text>
                            <Text style={styles.textLeft}>{invoiceData.soldByAddress}</Text>
                            <Text style={styles.textLeft}>{invoiceData.soldByCity}, {invoiceData.soldByState}, {invoiceData.soldByPincode}</Text>
                            <Text style={styles.boldTextLeft}>IN</Text>
                            <Text style={styles.boldTextLeft}></Text>
                            <Text style={styles.boldTextLeft}></Text>
                            <Text style={styles.textLeft}>PAN No: {invoiceData.panNo}</Text>
                            <Text style={styles.textLeft}>GST Registration No: {invoiceData.registrationNo}</Text>
                            <Text style={styles.boldTextLeft}></Text>
                            <Text style={styles.boldTextLeft}></Text>
                            <Text style={styles.textLeft}>Order No: {invoiceData.orderNo}</Text>
                            <Text style={styles.textLeft}>Order Date: {invoiceData.orderDate}</Text>
                        </View>
                    </View>
                    <View style={styles.rightSection}>
                        <View style={styles.section}>
                            <Text style={styles.heading}>Tax Invoice/Bill of Supply/Cash Memo</Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.textRight}>Billing Address:</Text>
                            <Text style={styles.textRight}>{invoiceData.billingName}</Text>
                            <Text style={styles.textRight}>{invoiceData.billingAddress}</Text>
                            <Text style={styles.textRight}>{invoiceData.billingCity}, {invoiceData.billingState}, {invoiceData.billingPincode}</Text>
                            <Text style={styles.textRight}>State/UT Code: {invoiceData.billingStateCode}</Text>
                            <Text style={styles.textRight}>IN</Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.textRight}>Shipping Address:</Text>
                            <Text style={styles.textRight}>{invoiceData.shippingName}</Text>
                            <Text style={styles.textRight}>{invoiceData.shippingAddress}</Text>
                            <Text style={styles.textRight}>{invoiceData.shippingCity}, {invoiceData.shippingState}, {invoiceData.shippingPincode}</Text>
                            <Text style={styles.textRight}>IN</Text>
                            <Text style={styles.textRight}>State/UT Code: {invoiceData.shippingStateCode}</Text>
                            <Text style={styles.textRight}>Place of supply: {invoiceData.placeOfSupply}</Text>
                            <Text style={styles.textRight}>Place of delivery: {invoiceData.placeOfDelivery}</Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.textRight}>Invoice Number: {invoiceData.invoiceNumber}</Text>
                            <Text style={styles.textRight}>Invoice Date: {invoiceData.date}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.middleSection}>
                    <View style={styles.section}>
                        <View style={styles.table}>
                            {/* Table Header */}
                            <View style={styles.tableRow}>
                                <View style={{ ...styles.tableCol, width: '4%' }}>
                                    <Text style={styles.tableCell}>Sl. No.</Text>
                                </View>
                                <View style={styles.tableColWide}>
                                    <Text style={styles.tableCell}>Description</Text>
                                </View>
                                <View style={{ ...styles.tableCol, width: '7%' }}>
                                    <Text style={styles.tableCellRight}>Unit Price</Text>
                                </View>
                                <View style={{ ...styles.tableCol, width: '4%' }}>
                                    <Text style={styles.tableCellRight}>Qty</Text>
                                </View>
                                <View style={{ ...styles.tableCol, width: '6%' }}>
                                    <Text style={styles.tableCellRight}>Discount</Text>
                                </View>
                                <View style={{ ...styles.tableCol, width: '10%' }}>
                                    <Text style={styles.tableCellRight}>Net Amount</Text>
                                </View>
                                <View style={{ ...styles.tableCol, width: '7%' }}>
                                    <Text style={styles.tableCellRight}>Tax Rate</Text>
                                </View>
                                <View style={{ ...styles.tableCol, width: '7%' }}>
                                    <Text style={styles.tableCellRight}>Tax Type</Text>
                                </View>
                                <View style={{ ...styles.tableCol, width: '10%' }}>
                                    <Text style={styles.tableCellRight}>Total Amount</Text>
                                </View>
                            </View>

                            {/* Table Data */}
                            {invoiceData.items.map((item, index) => {
                                const isSamePlace = invoiceData.placeOfSupply === invoiceData.placeOfDelivery;
                                let taxRate = parseFloat(item.taxRate) || 0;
                                let taxType = '';
                                let displayTaxRate = '';

                                if (isSamePlace) {
                                    const halfTaxRate = taxRate / 2;
                                    displayTaxRate = `${halfTaxRate}%    ${halfTaxRate}% `;
                                    taxType = 'CGST   SGST';
                                } else {
                                    displayTaxRate = `${taxRate}% IGST`;
                                    taxType = 'IGST';
                                }

                                const totalAmount = item.netAmount + (item.netAmount * taxRate) / 100;
                                const shippingCharge = parseFloat(item.shippingCharge) || 0;
                                const shiptotalAmount = shippingCharge + (shippingCharge * taxRate / 100);

                                return (
                                    <React.Fragment key={index}>
                                        <View style={styles.tableRow}>
                                            <View style={{ ...styles.tableCol, width: '4%' }}>
                                                <Text style={styles.tableCell}>{index + 1}</Text>
                                            </View>
                                            <View style={styles.tableColWide}>
                                                <Text style={styles.tableCell}>{item.description}</Text>
                                            </View>
                                            <View style={{ ...styles.tableCol, width: '7%' }}>
                                                <Text style={styles.tableCellRight}>${item.unitPrice}</Text>
                                            </View>
                                            <View style={{ ...styles.tableCol, width: '4%' }}>
                                                <Text style={styles.tableCellRight}>{item.qty}</Text>
                                            </View>
                                            <View style={{ ...styles.tableCol, width: '6%' }}>
                                                <Text style={styles.tableCellRight}>${item.discount}</Text>
                                            </View>
                                            <View style={{ ...styles.tableCol, width: '10%' }}>
                                                <Text style={styles.tableCellRight}>${item.netAmount}</Text>
                                            </View>
                                            <View style={{ ...styles.tableCol, width: '7%' }}>
                                                <Text style={styles.tableCellRight}>{displayTaxRate}</Text>
                                            </View>
                                            <View style={{ ...styles.tableCol, width: '7%' }}>
                                                <Text style={styles.tableCellRight}>{taxType}</Text>
                                            </View>
                                            <View style={{ ...styles.tableCol, width: '10%' }}>
                                                <Text style={styles.tableCellRight}>${totalAmount.toFixed(2)}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.tableRow}>
                                            <View style={{ ...styles.tableCol, width: '4%' }}>
                                                <Text style={styles.tableCell}></Text>
                                            </View>
                                            <View style={styles.tableColWide}>
                                                <Text style={styles.tableCell}>Shipping Charges</Text>
                                            </View>
                                            <View style={{ ...styles.tableCol, width: '7%' }}>
                                                <Text style={styles.tableCellRight}>${item.shippingCharge}</Text>
                                            </View>
                                            <View style={{ ...styles.tableCol, width: '4%' }}>
                                                <Text style={styles.tableCellRight}></Text>
                                            </View>
                                            <View style={{ ...styles.tableCol, width: '6%' }}>
                                                <Text style={styles.tableCellRight}></Text>
                                            </View>
                                            <View style={{ ...styles.tableCol, width: '10%' }}>
                                                <Text style={styles.tableCellRight}>${item.shippingCharge}</Text>
                                            </View>
                                            <View style={{ ...styles.tableCol, width: '7%' }}>
                                                <Text style={styles.tableCellRight}>{displayTaxRate}</Text>
                                            </View>
                                            <View style={{ ...styles.tableCol, width: '7%' }}>
                                                <Text style={styles.tableCellRight}>{taxType}</Text>
                                            </View>
                                            <View style={{ ...styles.tableCol, width: '10%' }}>
                                                <Text style={styles.tableCellRight}>${shiptotalAmount.toFixed(2)}</Text>
                                            </View>
                                        </View>
                                    </React.Fragment>
                                );
                            })}
                            <View style={styles.tableRow}>
                                <View style={{ ...styles.tableCol, width: '90%' }}>
                                    <Text style={styles.tableCell}>TOTAL</Text>
                                </View>
                                <View style={{ ...styles.tableCol, width: '10%' }}>
                                    <Text style={styles.tableCellRight}>${grandTotal.toFixed(2)}</Text>
                                </View>
                            </View>

                            <View style={styles.tableRow}>
                                <View style={{ ...styles.tableCol, width: '100%' }}>
                                    <Text style={styles.tableCell}>Total Amount In Words:</Text>
                                    <Text style={styles.tableCell}>{grandTotalInWords} Only</Text>
                                </View>
                            </View>

                            <View style={styles.tableRow}>
                                <View style={{ ...styles.tableCol, width: '100%' }}>
                                    <Text style={styles.tableCellRight}>{invoiceData.soldBy}</Text>
                                    <Text style={styles.tableCellRight}>{grandTotalInWords} Only</Text>
                                    {invoiceData.uploadedImage && (
                                        <Image style={styles.uploadedImage} src={invoiceData.uploadedImage} />
                                    )}
                                </View>
                            </View>


                        </View>
                    </View>
                    <Text style={styles.tableCell}>
                        Whether tax is payable under reverse charge: {invoiceData.taxPayable ? "Yes" : "No"}
                    </Text>

                </View>
            </Page>
        </Document>
    );
};

export default Invoice;

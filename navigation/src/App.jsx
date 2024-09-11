// import './App.css';
// import { BrowserRouter, Route, Routes, } from "react-router-dom";
// import Ser from './components/Services';
// import Home from './components/Home';
// import Nav from './components/Naive';
// import About from './components/About';
// import Contact from './components/Contactus';
// import Submit from './components/Submit';
// //import Crypto from './components/Crypto';
// import Mapping from './components/Mapping';
// function App() {
//   return (
//     <BrowserRouter>
//       <Nav />
//       <Routes>
//         <Route path="/" element={<Home />}></Route>
//         <Route path="/Services" element={<Ser />}></Route>
//         <Route path="/About" element={<About />}></Route>
//         <Route path="/Contactus" element={<Contact />}></Route>
//         <Route path="/Submit" element={<Submit />}></Route>
//         {/* <Route path="/crypto" element={<Crypto />}></Route> */}
//       </Routes>
//       {/* <Mapping /> */}
//     </BrowserRouter>
//   );
// }

// export default App;
// src/App.js

// import React from 'react';
// import PDFViewerComponent from './components/PDFViewerComponent';
// import GeneratePDF from './components/GeneratePDF';

// function App() {

//   const invoiceData = {
//     soldBy: "Company XYZ\n1234 Elm Street\n(City, State, Pincode)",
//     panNo: "ABCDE1234F",
//     registrationNo: "12345678901111111",
//     orderNo: "ORD001",
//     orderDate: "01/09/2024",
//     billingName: "John Doe",
//     billingAddress: "5678 Oak Avenue",
//     billingCityStatePincode: "Metropolis, NY 10001",
//     shippingName: "John Doe",
//     shippingAddress: "5678 Oak Avenue",
//     shippingCityStatePincode: "Metropolis, NY 10001",
//     invoiceNumber: "INV123456",
//     date: "01/09/2024",
//     items: [
//       {
//         description: "Product A",
//         unitPrice: 10.00,
//         qty: 2,
//         netAmount: 20.00,
//         taxRate: 5,
//         taxType: "GST",
//         totalAmount: 21.00
//       },
//       {
//         description: "Product B",
//         unitPrice: 15.00,
//         qty: 1,
//         netAmount: 15.00,
//         taxRate: 5,
//         taxType: "GST",
//         totalAmount: 15.75
//       }
//     ]
//   };

//   return (
//     <div className="App">
//       <h1>Invoice Generator</h1>
//       {/* <PDFViewerComponent invoiceData={invoiceData} /><h2>sssssssssssssssss</h2> */}
//       <GeneratePDF invoiceData={invoiceData} />
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import PDFViewerComponent from './components/PDFViewerComponent';
import GeneratePDF from './components/GeneratePDF';

function App() {
  // State to manage the form data
  const [formData, setFormData] = useState({
    soldBy: "",
    soldByAddress: "",
    soldByCity: "",
    soldByState: "",
    soldByPincode: "",
    panNo: "",
    registrationNo: "",
    orderNo: "",
    orderDate: "",
    billingName: "",
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingPincode: "",
    billingStateCode: "",
    shippingName: "",
    shippingAddress: "",
    shippingCity: "",
    shippingState: "",
    shippingPincode: "",
    shippingStateCode: "",
    invoiceNumber: "",
    date: "",
    placeOfSupply: "",
    placeOfDelivery: "",
    items: [
      { description: "", unitPrice: 0, qty: 0, discount: 0, netAmount: 0, taxRate: 0, taxType: "", totalAmount: 0, shippingCharge: 0 }
    ],
    uploadedImage: null,
    taxPayable: false,
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          uploadedImage: e.target.result  // Convert image to base64 and update formData
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle change for text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle change for individual item fields
  const handleItemChange = (e, index) => {
    const { name, value } = e.target;
    const updatedItems = [...formData.items];
    updatedItems[index][name] = value;
    setFormData({ ...formData, items: updatedItems });
  };

  // Add a new item row
  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: "", unitPrice: 0, qty: 0, discount: 0, netAmount: 0, taxRate: 0, taxType: "", totalAmount: 0, shippingCharge: 0 }]
    });
  };



  const calculateAmounts = (index) => {
    const updatedItems = [...formData.items];
    const item = updatedItems[index];

    // Ensure all values are properly parsed as floats and default to 0 if they are NaN or invalid
    const unitPrice = isNaN(parseFloat(item.unitPrice)) ? 0 : parseFloat(item.unitPrice);
    const qty = isNaN(parseFloat(item.qty)) ? 0 : parseFloat(item.qty);
    const discount = isNaN(parseFloat(item.discount)) ? 0 : parseFloat(item.discount);
    const taxRate = isNaN(parseFloat(item.taxRate)) ? 0 : parseFloat(item.taxRate);
    const shippingCharge = isNaN(parseFloat(item.shippingCharge)) ? 0 : parseFloat(item.shippingCharge); // Ensure shipping charge is included

    // Calculate net and total amounts
    const netAmount = (unitPrice * qty) - discount;
    const totalAmount = netAmount + (netAmount * taxRate) / 100;

    updatedItems[index] = { ...item, netAmount, totalAmount };
    setFormData({ ...formData, items: updatedItems });
  };



  return (
    <div className="App">
      <h1>Invoice Generator</h1>

      {/* Form to input invoice data */}
      <form>
        <h3>Seller Information</h3>
        <label>SoldBy:</label> {/* New input for Sold By Name */}
        <input type="text" name="soldBy" value={formData.soldBy} onChange={handleChange} />

        <label>Sold By Address:</label>
        <input type="text" name="soldByAddress" value={formData.soldByAddress} onChange={handleChange} />

        <label>Sold By City:</label>
        <input type="text" name="soldByCity" value={formData.soldByCity} onChange={handleChange} />

        <label>Sold By State:</label>
        <input type="text" name="soldByState" value={formData.soldByState} onChange={handleChange} />

        <label>Sold By Pincode:</label>
        <input type="text" name="soldByPincode" value={formData.soldByPincode} onChange={handleChange} />

        <label>PAN No:</label>
        <input type="text" name="panNo" value={formData.panNo} onChange={handleChange} />

        <label>GST Registration No:</label>
        <input type="text" name="registrationNo" value={formData.registrationNo} onChange={handleChange} />

        <label>Order No:</label>
        <input type="text" name="orderNo" value={formData.orderNo} onChange={handleChange} />

        <label>Order Date:</label>
        <input type="date" name="orderDate" value={formData.orderDate} onChange={handleChange} />

        <h3>Billing Information</h3>
        <label>Billing Name:</label>
        <input type="text" name="billingName" value={formData.billingName} onChange={handleChange} />

        <label>Billing Address:</label>
        <input type="text" name="billingAddress" value={formData.billingAddress} onChange={handleChange} />

        <label>Billing City:</label>
        <input type="text" name="billingCity" value={formData.billingCity} onChange={handleChange} />

        <label>Billing State:</label>
        <input type="text" name="billingState" value={formData.billingState} onChange={handleChange} />

        <label>Billing Pincode:</label>
        <input type="text" name="billingPincode" value={formData.billingPincode} onChange={handleChange} />

        <label>ST/UT code:</label>
        <input type="text" name="billingStateCode" value={formData.billingStateCode} onChange={handleChange} />

        <h3>Shipping Information</h3>
        <label>Shipping Name:</label>
        <input type="text" name="shippingName" value={formData.shippingName} onChange={handleChange} />

        <label>Shipping Address:</label>
        <input type="text" name="shippingAddress" value={formData.shippingAddress} onChange={handleChange} />

        <label>Shipping City:</label>
        <input type="text" name="shippingCity" value={formData.shippingCity} onChange={handleChange} />

        <label>Shipping State:</label>
        <input type="text" name="shippingState" value={formData.shippingState} onChange={handleChange} />

        <label>Shipping Pincode:</label>
        <input type="text" name="shippingPincode" value={formData.shippingPincode} onChange={handleChange} />

        <label>ST/UT code:</label>
        <input type="text" name="shippingStateCode" value={formData.shippingStateCode} onChange={handleChange} />

        <h3>Invoice Information</h3>
        <label>Invoice Number:</label>
        <input type="text" name="invoiceNumber" value={formData.invoiceNumber} onChange={handleChange} />

        <label>Invoice Date:</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} />

        <label>Place of Supply:</label>
        <input type="text" name="placeOfSupply" value={formData.placeOfSupply} onChange={handleChange} />

        <label>Place of Delivery:</label>
        <input type="text" name="placeOfDelivery" value={formData.placeOfDelivery} onChange={handleChange} />

        <label>
          Is Tax Payable?
          <input
            type="checkbox"
            checked={formData.taxPayable}
            onChange={(e) => setFormData({ ...formData, taxPayable: e.target.checked })}
          />
        </label>

        <h2>Upload seller Signature</h2>
        <input type="file" onChange={handleImageUpload} accept="image/*" />
        <h3>Items</h3>
        {formData.items.map((item, index) => (
          <div key={index}>
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={item.description}
              onChange={(e) => handleItemChange(e, index)}
            />

            <label>Unit Price:</label>
            <input
              type="number"
              name="unitPrice"
              value={item.unitPrice}
              onChange={(e) => handleItemChange(e, index)}
              onBlur={() => calculateAmounts(index)} // Recalculate amounts when user leaves the input
            />

            <label>Quantity:</label>
            <input
              type="number"
              name="qty"
              value={item.qty}
              onChange={(e) => handleItemChange(e, index)}
              onBlur={() => calculateAmounts(index)} // Recalculate amounts when user leaves the input
            />

            <label>Discount:</label>
            <input
              type="number"
              name="discount"
              value={item.discount}
              onChange={(e) => handleItemChange(e, index)}
              onBlur={() => calculateAmounts(index)} // Recalculate amounts when user leaves the input
            />

            <label>Tax Rate (%):</label>
            <input
              type="number"
              name="taxRate"
              value={item.taxRate}
              onChange={(e) => handleItemChange(e, index)}
              onBlur={() => calculateAmounts(index)} // Recalculate amounts when user leaves the input
            />

            <label>shipping charge:</label>
            <input
              type="text"
              name="shippingCharge"
              value={item.shippingCharge}
              onChange={(e) => handleItemChange(e, index)}
            />


            <label>Tax Type:</label>
            <input
              type="text"
              name="taxType"
              value={item.taxType}
              onChange={(e) => handleItemChange(e, index)}
            />

            <label>Total Amount: ${item.totalAmount ? item.totalAmount.toFixed(2) : '0.00'}</label>
          </div>
        ))}
        <button type="button" onClick={addItem}>
          Add Item
        </button>
      </form>

      {/* Generate PDF using form data */}
      <GeneratePDF invoiceData={formData} />
    </div>
  );
}

export default App;


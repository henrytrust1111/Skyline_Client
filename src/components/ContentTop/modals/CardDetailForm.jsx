import React, { useState } from 'react';

const CardDetailsForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form validation and submission logic here
  //   console.log('Card Details Submitted:', {
  //     cardNumber,
  //     cardholderName,
  //     expiryDate,
  //     cvv,
  //   });
  };

  return (
    <form className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="cardNumber" className="block text-gray-700 text-sm font-bold mb-2">
          Card Number
        </label>
        <input
          type="text"
          id="cardNumber"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="cardholderName" className="block text-gray-700 text-sm font-bold mb-2">
          Cardholder Name
        </label>
        <input
          type="text"
          id="cardholderName"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="expiryDate" className="block text-gray-700 text-sm font-bold mb-2">
          Expiry Date
        </label>
        <input
          type="text"
          id="expiryDate"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
          placeholder="MM/YY"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="cvv" className="block text-gray-700 text-sm font-bold mb-2">
          CVV
        </label>
        <input
          type="text"
          id="cvv"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </form>
  );
};

export default CardDetailsForm;

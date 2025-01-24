import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const CardDetailsFormModal = ({ onClose }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cardNumber && cardholderName && expiryDate && cvv) {
      setLoading(true);
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.post(
          'https://skyline-2kje.onrender.com/card-details', 
          {
            cardNumber,
            cardHolderName: cardholderName,
            expiryDate,
            cvv,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success(response.data.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setCardNumber('');
        setCardholderName('');
        setExpiryDate('');
        setCvv('');
        onClose();
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error('An unexpected error occurred.', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('Please fill in all fields.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center -bg--clr-secondary bg-opacity-50 z-50">
      <ToastContainer />
      <div className="-bg--clr-primary rounded-lg overflow-hidden shadow-xl transform transition-all w-[90%] max-w-lg sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto p-6">
        <div className="flex justify-end">
          <button
            type="button"
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <FaTimes size={24} />
          </button>
        </div>
        <h3 className="text-2xl leading-6 font-medium -text--clr-light-gray mb-4 text-center">Add Card Details</h3>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block -text--clr-silver-v1 text-sm font-bold mb-2">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              placeholder='XXXX XXXX XXXXX XXXX'
              className="shadow appearance-none bg-transparent border-b -border--clr-silver  w-full py-2 px-3 -text--clr-silver-v1 leading-tight focus:outline-none focus:shadow-outline"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cardholderName" className="block -text--clr-silver-v1 text-sm font-bold mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              id="cardholderName"
              placeholder='e.g. Mike Scott'
              className="shadow appearance-none bg-transparent border-b -border--clr-silver w-full py-2 px-3 -text--clr-silver-v1 leading-tight focus:outline-none focus:shadow-outline"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="expiryDate" className="block -text--clr-silver-v1 text-sm font-bold mb-2">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              className="shadow appearance-none bg-transparent border-b -border--clr-silver w-full py-2 px-3 -text--clr-silver-v1 leading-tight focus:outline-none focus:shadow-outline"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
              placeholder="MM/YY"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="cvv" className="block -text--clr-silver-v1 text-sm font-bold mb-2">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              placeholder='XXX'
              className="shadow appearance-none bg-transparent border-b -border--clr-silver w-full py-2 px-3 -text--clr-silver-v1 leading-tight focus:outline-none focus:shadow-outline"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="-bg--clr-pumpkin -text--clr-silver-v1 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:-bg--clr-pumpkin-light transition duration-300"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardDetailsFormModal;









// import React, { useState } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
// import { FaTimes } from 'react-icons/fa';
// import 'react-toastify/dist/ReactToastify.css';

// const CardDetailsFormModal = ({ onClose }) => {
//   const [cardNumber, setCardNumber] = useState('');
//   const [cardholderName, setCardholderName] = useState('');
//   const [expiryDate, setExpiryDate] = useState('');
//   const [cvv, setCvv] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (cardNumber && cardholderName && expiryDate && cvv) {
//       toast.success('Card Details Submitted Successfully!', {
//         position: 'top-right',
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//       console.log('Card Details Submitted:', {
//         cardNumber,
//         cardholderName,
//         expiryDate,
//         cvv,
//       });
//       setCardNumber('');
//       setCardholderName('');
//       setExpiryDate('');
//       setCvv('');
//       onClose();
//     } else {
//       toast.error('Please fill in all fields.', {
//         position: 'top-right',
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center -bg--clr-secondary bg-opacity-50 z-50">
//       <ToastContainer />
//       <div className="-bg--clr-primary rounded-lg overflow-hidden shadow-xl transform transition-all w-[90%] max-w-lg sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto p-6">
//         <div className="flex justify-end">
//           <button
//             type="button"
//             className="text-gray-400 hover:text-gray-600"
//             onClick={onClose}
//           >
//             <FaTimes size={24} />
//           </button>
//         </div>
//         <h3 className="text-2xl leading-6 font-medium -text--clr-light-gray mb-4 text-center">Add Card Details</h3>
//         <form className="w-full" onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="cardNumber" className="block -text--clr-silver-v1 text-sm font-bold mb-2">
//               Card Number
//             </label>
//             <input
//               type="text"
//               id="cardNumber"
//               placeholder='XXXX XXXX XXXXX XXXX'
//               className="shadow appearance-none bg-transparent border-b -border--clr-silver  w-full py-2 px-3 -text--clr-silver-v1 leading-tight focus:outline-none focus:shadow-outline"
//               value={cardNumber}
//               onChange={(e) => setCardNumber(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="cardholderName" className="block -text--clr-silver-v1 text-sm font-bold mb-2">
//               Cardholder Name
//             </label>
//             <input
//               type="text"
//               id="cardholderName"
//               placeholder='e.g. Mike Scott'
//               className="shadow appearance-none bg-transparent border-b -border--clr-silver w-full py-2 px-3 -text--clr-silver-v1 leading-tight focus:outline-none focus:shadow-outline"
//               value={cardholderName}
//               onChange={(e) => setCardholderName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="expiryDate" className="block -text--clr-silver-v1 text-sm font-bold mb-2">
//               Expiry Date
//             </label>
//             <input
//               type="text"
//               id="expiryDate"
//               className="shadow appearance-none bg-transparent border-b -border--clr-silver w-full py-2 px-3 -text--clr-silver-v1 leading-tight focus:outline-none focus:shadow-outline"
//               value={expiryDate}
//               onChange={(e) => setExpiryDate(e.target.value)}
//               required
//               placeholder="MM/YY"
//             />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="cvv" className="block -text--clr-silver-v1 text-sm font-bold mb-2">
//               CVV
//             </label>
//             <input
//               type="text"
//               id="cvv"
//               placeholder='XXX'
//               className="shadow appearance-none bg-transparent border-b -border--clr-silver w-full py-2 px-3 -text--clr-silver-v1 leading-tight focus:outline-none focus:shadow-outline"
//               value={cvv}
//               onChange={(e) => setCvv(e.target.value)}
//               required
//             />
//           </div>
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               className="-bg--clr-pumpkin -text--clr-silver-v1 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:-bg--clr-pumpkin-light transition duration-300"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CardDetailsFormModal;

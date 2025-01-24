import React from 'react';
import { FaComments } from 'react-icons/fa';

const ChatButton = ({ onClick }) => {
  return (
    <div className='fixed bottom-5 right-5'>
      <button
        onClick={onClick}
        className='text-white -bg--clr-pumpkin  p-4 rounded-full shadow-lg hover:scale-125 transition duration-300 z-20'
      >
        <FaComments size={24} />
      </button>
    </div>
  ); 
};

export default ChatButton;

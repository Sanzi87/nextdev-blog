'use client';
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AiFillCopy } from 'react-icons/ai';

interface CopyButtonProps {
  code: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);

    // Reset the "Copied" state after 2 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <CopyToClipboard text={code} onCopy={handleCopy}>
      <button className='absolute top-2 right-2 bg-gray-800 p-2 rounded-full opacity-70 hover:opacity-100 focus:outline-none'>
        {isCopied ? <span>Copied!</span> : <AiFillCopy />}
      </button>
    </CopyToClipboard>
  );
};

export default CopyButton;

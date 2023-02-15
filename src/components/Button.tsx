import React from 'react';

interface Props {
  text: string;
  className?: string;
  type: 'button' | 'submit';
  onClick?: () => void;
}

const Button = ({ text, className, type, onClick }: Props) => {
  return (
    <>
      <button type={type} onClick={onClick} className={`px-4 py-2 rounded-2xl ${className}`}>
        {text}
      </button>
    </>
  );
};

export default Button;

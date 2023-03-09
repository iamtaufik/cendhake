import React from 'react';

interface Props {
  text: string;
  className?: string;
  ariaLabel: string;
  type: 'button' | 'submit';
  onClick?: () => void;
}

const Button = ({ text, className, type, onClick, ariaLabel }: Props) => {
  return (
    <>
      <button type={type} onClick={onClick} className={`px-4 py-2 rounded-2xl ${className}`} aria-label={ariaLabel}>
        {text}
      </button>
    </>
  );
};

export default Button;

import React from 'react';

import styles from './Button.module.css';

const Button: React.FC<{
  className?: string;
  isMain?: boolean;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
  onClick?: () => void;
  children: React.ReactNode;
}> = (props) => {
  const style = props.disabled ? styles.disabled : props.isMain ? styles.mainbutton : styles.button;

  return (
    <button
      className={`${props.className || ''} ${styles.shape} ${style}`}
      type={props.type || 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;

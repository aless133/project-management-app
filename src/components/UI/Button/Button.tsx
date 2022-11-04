import React, { FC } from 'react';
import styles from './Button.module.scss';

interface IButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const Button: FC<IButtonProps> = ({ children, ...props }): JSX.Element => {
  return (
    <button {...props} className={props.className ?? styles.standardBtn}>
      {children}
    </button>
  );
};

import React, { forwardRef } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styles from './CustomNavLink.module.scss';

const setActive = (props: { isActive: boolean }): string => {
  return props.isActive ? styles.navLinkActive : styles.navLink;
};

export const CustomNavLink = forwardRef(
  (
    props: JSX.IntrinsicAttributes & NavLinkProps & React.RefAttributes<HTMLAnchorElement>,
    ref: React.Ref<HTMLAnchorElement> | undefined
  ) => <NavLink ref={ref} {...props} className={setActive} />
);

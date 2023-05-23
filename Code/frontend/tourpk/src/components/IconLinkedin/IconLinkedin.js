import React from 'react';
import styles from './IconLinkedin.module.css';

export const IconLinkedin = (props) => {
   const { rootClassName } = props;
   const classFill = rootClassName == "dark" ? styles.dark : styles.light;
   return (
      <>
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={classFill}>
            <path d="M12.0002 2.05444C6.50737 2.05444 2.05469 6.50713 2.05469 12C2.05469 17.4928 6.50737 21.9455 12.0002 21.9455C17.493 21.9455 21.9457 17.4928 21.9457 12C21.9457 6.50713 17.493 2.05444 12.0002 2.05444ZM9.56562 16.1222H7.55165V9.641H9.56562V16.1222ZM8.5462 8.84536C7.9101 8.84536 7.49882 8.3947 7.49882 7.83734C7.49882 7.26858 7.92254 6.83139 8.5721 6.83139C9.22167 6.83139 9.61949 7.26858 9.63192 7.83734C9.63192 8.3947 9.22167 8.84536 8.5462 8.84536ZM16.9211 16.1222H14.9072V12.5304C14.9072 11.6943 14.615 11.1266 13.8867 11.1266C13.3304 11.1266 12.9999 11.511 12.8539 11.8808C12.8 12.0124 12.7865 12.1989 12.7865 12.3843V16.1211H10.7715V11.7078C10.7715 10.8987 10.7456 10.2222 10.7187 9.63996H12.4685L12.5607 10.5402H12.6011C12.8663 10.1176 13.5158 9.49389 14.6026 9.49389C15.9276 9.49389 16.9211 10.3817 16.9211 12.29V16.1222Z" fill="#004346" />
         </svg>
      </>
   );
};

import React from "react"
import { NavLink } from "react-router-dom"

const Logo: React.FC = () => {
    return (
        <NavLink
            to='/'
            className={({ isActive }) => isActive ? 'logo active' : 'logo'}
            aria-label="Logo"
        >
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 308 308">
                <defs>

                    <linearGradient id="skeleton-gradient" x1="-100%" x2="200%" gradientUnits="userSpaceOnUse" gradientTransform="rotate(10)">
                        <stop offset="0" stopColor="var(--md-sys-color-surface-variant)" stopOpacity="1">
                            <animate attributeName="offset" values="0;0.8" dur="1.4s" repeatCount="indefinite" />
                        </stop>
                        <stop offset="0.1" stopColor="var(--md-sys-color-surface-variant)" stopOpacity="0" >
                            <animate attributeName="offset" values="0.1;0.9" dur="1.4s" repeatCount="indefinite" />
                        </stop>
                        <stop offset="0.2" stopColor="var(--md-sys-color-surface-variant)" stopOpacity="1" >
                            <animate attributeName="offset" values="0.2;1" dur="1.4s" repeatCount="indefinite" />
                        </stop>
                    </linearGradient>

                    <linearGradient id="logo-gradient" x1="25" y1="163.94" x2="283" y2="163.94" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#90cea1" />
                        <stop offset="1" stopColor="#01b4e4" />
                    </linearGradient>

                </defs>
                <rect fill='var(--md-sys-color-primary)' opacity='0.11' x="2" y="2" width="304" height="304" rx="60" ry="60" />
                <path fill='url(#logo-gradient)' d="M40.52,45.09h27.93c8.95,0,15.95,1.95,21,5.83,5.04,3.89,7.57,9.63,7.57,17.21s-2.55,13.25-7.64,17.29c-5.09,4.04-12.07,6.12-20.92,6.25h-10.4v24.51h-17.53V45.09Zm27.29,33.98c4.17,0,7.15-.93,8.96-2.78s2.73-4.51,2.76-7.96c0-3.55-.9-6.18-2.71-7.89s-4.81-2.56-9.01-2.56h-9.86v21.19h9.86Zm-4.25,4.25l18.46-.54,18.51,33.4h-19.68l-17.29-32.86Zm49.9-38.48h17.48v44.38c0,5.79,1.14,9.79,3.42,11.99,2.28,2.2,5.37,3.3,9.28,3.3s7.07-1.1,9.3-3.3c2.23-2.2,3.34-6.19,3.34-11.99V44.85h17.04v43.21c0,10.22-2.87,17.66-8.59,22.31-5.73,4.66-12.81,6.98-21.24,6.98s-15.62-2.33-21.39-6.98c-5.76-4.65-8.64-12.09-8.64-22.31V44.85Zm169.54,201.19h0c0-20.43-16.57-37-37-37H62c-20.43,0-37,16.57-37,37h0c0,20.43,16.57,37,37,37H246c20.43,0,37-16.57,37-37Z" />
            </svg>
        </NavLink>
    )
}

export default Logo
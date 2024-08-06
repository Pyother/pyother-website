import React from 'react';

const IconPainter = ({ IconComponent, ...props }) => {
    const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`; // Unikalne ID gradientu

    return (
        <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
            <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#00d67d', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#91b9fc', stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <g fill={`url(#${gradientId})`}>
                <IconComponent />
            </g>
        </svg>
    );
};

export default IconPainter;

import React from "react";

const Rating: React.FC<{rating: number, radius: number, votes: number}> = ({rating, radius, votes}) => {

    let color = rating * 12;
    let r: number = radius;
    let strokeWidth: number = radius / 4.5;
    let width: number = (r + strokeWidth) * 2;
    let height: number = (r + strokeWidth) * 2;

    let x: number = width / 2;
    let y: number = height / 2;
    let k = (rating) / 10;
    let strokeColor: string;
    let strokeColorBack: string;

    if (color < 0 ) {
        strokeColor = `hsl(0 80% 45%)`;
        strokeColorBack = `hsl(0 50% 20%)`;
    } else if (color > 120) {
        strokeColor = `hsl(120 80% 45%)`;
        strokeColorBack = `hsl(120 50% 20%)`;
    } else {
        strokeColor = `hsl(${color} 80% 45%)`;
        strokeColorBack = `hsl(${color} 50% 20%)`;
    }

    return(
        <svg xmlns="http://www.w3.org/2000/svg" 
            width={width} 
            height={height}
            className={votes < 100 ? 'low-votes' : undefined}
            >
            <circle 
                fill='#081c22'
                cx={x}
                cy={y}
                r={r + strokeWidth}
            />
            <circle 
                stroke={strokeColorBack}
                fill='none' 
                strokeWidth={strokeWidth}
                cx={x}
                cy={y}
                r={r}
            />
            <circle 
                stroke={strokeColor}
                fill='none' 
                strokeWidth={strokeWidth} 
                cx={x}
                cy={y}
                r={r}
                strokeLinecap="round"
                transform={`rotate(-90 ${x} ${y})`}
                strokeDasharray={`${(2 * Math.PI * r)} ${(2 * Math.PI * r)}`}
                strokeDashoffset={(2 * Math.PI * r) - (2 * Math.PI * r * k)}
            />
            <text x={x} y={y} dominantBaseline="central" textAnchor="middle" className='rating-text'>{rating}</text>
        </svg>
    )
}
export default Rating;
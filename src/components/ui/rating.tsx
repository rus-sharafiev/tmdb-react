import React from "react";

const Rating: React.FC<{ rating: number | undefined, radius: number, votes: number | undefined }> = ({ rating, radius, votes }) => {

    let color = rating ? rating * 12 : 0;
    let r: number = radius;
    let strokeWidth: number = radius / 4.5;
    let width: number = (r + strokeWidth) * 2;
    let height: number = (r + strokeWidth) * 2;

    let x: number = width / 2;
    let y: number = height / 2;
    let k = rating ? (rating) / 10 : 0;
    let strokeColor: string;
    let strokeColorBack: string;

    if (color < 0) {
        strokeColor = `hsl(0 80% 45%)`;
        strokeColorBack = `hsl(0 50% 20%)`;
    } else if (color > 120) {
        strokeColor = `hsl(120 80% 45%)`;
        strokeColorBack = `hsl(120 50% 20%)`;
    } else {
        strokeColor = `hsl(${color} 80% 45%)`;
        strokeColorBack = `hsl(${color} 50% 20%)`;
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={votes === undefined || votes < 100 ? 'rating low-votes' : 'rating'}
        >
            <circle
                fill='#081c22'
                cx={x}
                cy={y}
                r={r + strokeWidth}
                shapeRendering="geometricPrecision"
            />
            <circle
                stroke={strokeColorBack}
                fill='none'
                strokeWidth={strokeWidth}
                cx={x}
                cy={y}
                r={r}
                shapeRendering="geometricPrecision"
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
                shapeRendering="geometricPrecision"
            />
            <text x={x} y={y} dominantBaseline="central" textAnchor="middle" className='rating-text'>{rating ? rating.toFixed(1) : '-'}</text>
        </svg>
    )
}
export default Rating;
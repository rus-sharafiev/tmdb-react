import React, { useEffect, useState } from 'react';

export interface CircularProgressIndicator {
    /** Vertical length of the element */
    height?: number;
    /** Horizontal length of the element */
    width?: number;
    /** Radius of the circle */
    r?: number;
    /** Width of the stroke */
    strokeWidth?: number;
    /** Duration of the animation */
    dur?: number;
    /** Color used to paint the outline of the circle */
    stroke?: string;
    /** Value in milliseconds which describes a delay before showing the component */
    timeout?: number;
    /** Class name or set of class names which will assign to the element  */
    className?: string;
    /** Pass onClick property to the root DOM element of the component */
    onClick?: () => void;
}

const CircularProgressIndicator = (props: CircularProgressIndicator) => {
    const [opacity, setOpacity] = useState(0);
    
    useEffect(() => {
        if (props.timeout) {
            setTimeout(() => {
                setOpacity(1)
            }, props.timeout);
        } else {
            setTimeout(() => {
                setOpacity(1)
            }, 400);
        }
    }, []);

    let x = props.width ? props.width / 2 : 25;
    let y = props.height ? props.height / 2 : 25;
    let r = props.r ? props.r : 18;

    return(
        <div className={props.className ? props.className : undefined} style={{opacity: opacity, transition: 'opacity 0.2s ease-in-out'}}>
            <svg xmlns="http://www.w3.org/2000/svg" 
                width={props.width ? props.width : 50} 
                height={props.height ? props.height : 50}
                onClick={props.onClick}
                >
                <circle 
                    stroke={props.stroke ? props.stroke : undefined} 
                    fill='none' 
                    strokeWidth={props.strokeWidth ? props.strokeWidth : 4} 
                    cx={x}
                    cy={y}
                    r={r}
                    strokeDasharray={`${(2 * Math.PI * r * 0.95)} ${(2 * Math.PI * r * 0.9)}`}
                    strokeDashoffset={-(2 * Math.PI * r)}
                >
                    <animate attributeName="stroke-dashoffset"
                        dur={props.dur ? props.dur + 's' : '4.1s'} 
                        repeatCount="indefinite" 
                        values={`${(-2 * Math.PI * r * 1 )}; ${(-2 * Math.PI * r * 1.81 )}; ${(-2 * Math.PI * r * 1.86 )}; ${(-2 * Math.PI * r * 2.56 )}; ${(-2 * Math.PI * r * 2.74 )}; ${(-2 * Math.PI * r * 2.86 )}; ${(-2 * Math.PI * r * 3.67 )}; ${(-2 * Math.PI * r * 3.71 )}; ${(-2 * Math.PI * r * 4.42 )}; ${(-2 * Math.PI * r * 4.6 )}; ${(-2 * Math.PI * r * 4.71 )}`}
                        keyTimes="0; 0.0625; 0.125; 0.1875; 0.25; 0.5; 0.5625; 0.625; 0.6875; 0.75; 1"
                    />
                    <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="rotate"
                        dur={props.dur ? props.dur + 's' : '4.1s'}
                        repeatCount="indefinite" 
                        values={`-90 ${x} ${y}; 270 ${x} ${y}; 450 ${x} ${y}; 810 ${x} ${y}; 990 ${x} ${y}`}
                        keyTimes="0; 0.3; 0.5; 0.8; 1"
                    />
                </circle>
            </svg>
        </div>
    )
}
export default CircularProgressIndicator;
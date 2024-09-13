import React from 'react';

const CircularGauge = ({ value }) => {
  const radius = 70;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  // Calculate stroke color based on completion percentage
  const strokeColor = value >= 100 ? '#f44336' : '#00c853'; // Green if complete, Red if incomplete

  return (
    <svg height={radius * 2} width={radius * 2}>
      {value >= 100 ? (
        // Render a big green tick if the value is 100%
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="40"
          fontWeight="bold"
          fill="#00c853"
        >
          ✓
        </text>
      ) : (
        <>
          <circle
            stroke="#f5f5f5" // Background color
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke={strokeColor} // Dynamic stroke color
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="20"
            fontWeight="bold"
            fill="#3f51b5"
          >
            {`${Math.round(value)}%`}
          </text>
        </>
      )}
    </svg>
  );
};

export default CircularGauge;


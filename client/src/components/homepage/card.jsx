import React from 'react';

export function Card({ title, description, icon, iconColor, buttonLabel, onClick }) {
  return (
    <div className="flex flex-col items-start bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1">
      {/* Icon */}
      <div
        className="w-14 h-14 flex items-center justify-center rounded-2xl mb-4 transition-transform duration-300 group-hover:rotate-6"
        style={{ backgroundColor: `${iconColor}1A` }}
      >
        <div style={{ color: iconColor }} className="text-2xl">
          {icon}
        </div>
      </div>

      {/* Title */}
      <h2 className="text-xl font-extrabold text-gray-900 mb-1">{title}</h2>

      {/* Description */}
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">{description}</p>

      {/* Matching Color Button */}
      <button
        onClick={onClick}
        className="mt-auto py-2 px-4 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200"
        style={{
          backgroundColor: iconColor,
          color: 'white'
        }}
      >
        {buttonLabel}
      </button>
    </div>
  );
}

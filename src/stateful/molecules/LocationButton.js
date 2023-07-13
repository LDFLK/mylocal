import React from 'react';
import './LocationButton.css';
// import locationIcon from '/location-icon.svg'; // Replace with the path to your icon file


export default function LocationButton({ onClick }) {
  return (
    <button className="location-button" onClick={onClick}>
      <img src="/mylocal/location-icon.svg" alt="" />
    </button>
  );
}

"use client";
import React from 'react'
import Snowfall from 'react-snowfall'

const SnowFall = () => {
  let date = new Date();
  let month = date.getMonth() + 1; // getMonth() returns 0-11

  if (month !== 12 && month !== 1 && month !== 2) {
    return null; // Do not render snowfall outside of December, January, February
  }
  
  return (
      <Snowfall
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 100,
        }}
      />
  )
}

export default SnowFall

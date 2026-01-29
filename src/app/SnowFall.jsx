"use client";
import React from 'react'
import Snowfall from 'react-snowfall'

const SnowFall = () => {
  return (
      <Snowfall
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 500,
        }}
      />
  )
}

export default SnowFall

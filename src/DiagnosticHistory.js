import React, { useEffect, useState } from 'react';
import Graph from './Graph';
import { fetchData } from './api';
import { Cards } from './Cards';

export const DiagnosticHistory = () => {
  return (
    <div
      style={{
        width: "70%",
        height:'50vh',
        margin: "0 auto",
        backgroundColor: "#F4F0FE",
        borderRadius: "24px",
      }}
    >
        <Graph />
        <Cards />
    </div>
  );
};

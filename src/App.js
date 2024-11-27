import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';  // Use BrowserRouter

import DiagnosticList from './DiagnosticList';
import  Graph  from './Graph';
import { GraphMore } from './GraphMore';

const App = () => {
  return (
    <BrowserRouter>  {/* Correct component */}
      <Routes>
        <Route path="/" element={<Graph />} />  {/* Use path instead of pathname */}
        <Route path="/1" element={<GraphMore />} />  {/* Use path instead of pathname */}
        <Route path="/2" element={<DiagnosticList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';  // Use BrowserRouter

import DiagnosticList from './DiagnosticList';
import  Graph  from './Graph';
import { DiagnosticHistory } from './DiagnosticHistory';
import { Cards } from './Cards';

const App = () => {
  return (
    <BrowserRouter>  {/* Correct component */}
      <Routes>
        <Route path="/" element={<Graph />} />  {/* Use path instead of pathname */}
        <Route path="/1" element={<DiagnosticHistory />} />  {/* Use path instead of pathname */}
        <Route path="/2" element={<DiagnosticList />} />
        <Route path="/3" element={<Cards />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

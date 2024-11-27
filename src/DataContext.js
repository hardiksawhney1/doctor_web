// DataContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchData } from './api';

const DataContext = createContext(); // Create a context for data

export const useData = () => {
  return useContext(DataContext); // Custom hook to use context easily
};

export const DataProvider = ({ children }) => {
  const [diagnosticData, setDiagnosticData] = useState([]); // State to hold formatted data

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchData(); // Fetch data from API
        const jessicaData = response[0]; // Access the relevant dataset

        // Transform the first 6 entries from `diagnosis_history` into the required format
        const formattedData = jessicaData.diagnosis_history
          .slice(0, 6)
          .map((entry) => ({
            month: `${entry.month} ${entry.year}`, // Combine month and year
            systolic: entry.blood_pressure.systolic.value,
            systolicLevel: entry.blood_pressure.systolic.levels,
            diastolic: entry.blood_pressure.diastolic.value,
            diastolicLevel: entry.blood_pressure.diastolic.levels,
            respiratory: entry.respiratory_rate.value,
            respiratoryLevel : entry.respiratory_rate.levels,
          }));

        setDiagnosticData(formattedData); // Update state with formatted data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  return (
    <DataContext.Provider value={{ diagnosticData }}>
      {children} {/* Wrap the children components with the provider */}
    </DataContext.Provider>
  );
};

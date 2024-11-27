import React, { useEffect, useState } from 'react';
import Graph from './Graph';
import { fetchData } from './api';

export const GraphMore = () => {
  const [data, setData] = useState([]); // State for the graph data

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchData(); // Fetch data from API
        const jessicaData = response[0]; // Access the relevant dataset
        console.log("find more",jessicaData.diagnosis_history);
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

        setData(formattedData); // Update state with formatted data
        console.log("Formatted Data:", formattedData); // Logs correctly
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

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
        <Graph  />
      {/* <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '70%', height: '100%' }}>
            {console.log("data before passing", data)}
          <Graph dataFromthere={data} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '30%', height: '100%' }}>
          <div
            style={{
              height: '50%',
              backgroundColor: 'red',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <p>Systolic</p>

          </div>
          <div style={{ height: '50%', backgroundColor: 'yellow' }}>yellow</div>
        </div>
      </div> */}
    </div>
  );
};

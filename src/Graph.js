import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useData } from './DataContext';
// Register required components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Graph = () => {
    const { diagnosticData, selectedIndex, updateIndex } = useData();
    const [systolicValue, setSystolicValue] = useState(null); 
    const [diastolic, setDiastolic] = useState(null); 
    
    
  // Check if data is available
  if (!diagnosticData || diagnosticData.length === 0) {
    return <p style={{ textAlign: "center" }}>Loading data...</p>;
  }
  if (systolicValue === null && diagnosticData.length > 0) {
    setSystolicValue(diagnosticData[0].systolic);
    setDiastolic(diagnosticData[0].diastolic);
  }
  
  // Prepare data for Chart.js
  const chartData = {
    labels: diagnosticData.map((item) => item.month), // x-axis labels
    datasets: [
      {
        label: "Systolic",
        data: diagnosticData.map((item) => item.systolic), // y-axis data
        borderColor: "#E66FD2", // Line color
        backgroundColor: "rgba(230, 111, 210, 0.2)", // Area fill color
        pointBackgroundColor: "#E66FD2", // Dot color
        tension: 0.4, // Smooth curves
      },
      {
        label: "Diastolic",
        data: diagnosticData.map((item) => item.diastolic),
        borderColor: "#8C6FE6",
        backgroundColor: "rgba(140, 111, 230, 0.2)",
        pointBackgroundColor: "#8C6FE6",
        tension: 0.4,
      },
    ],
  };

  // Chart.js options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            return `${context.dataset.label}: ${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          text: "Month",
        },
        grid: {
          color: "#F0F0F0",
        },
      },
      y: {
        title: {
          display: false,
          text: "Pressure (mmHg)",
        },
        grid: {
          color: "#F0F0F0",
        },
      },
    },
    onClick: (event, elements) => {
      // Check if a point was clicked
      if (elements.length > 0) {
        const element = elements[0];
        // const datasetIndex = element.datasetIndex; // Dataset index (0 = Systolic, 1 = Diastolic)
        const index = element.index; // Data index
        // const label = chartData.labels[index]; // Month
        // const value = chartData.datasets[datasetIndex].data[index]; // Value
        // const datasetLabel = chartData.datasets[datasetIndex].label; // Dataset name


        updateIndex(index);

        
        const value2 = chartData.datasets[0].data[index]; // Value
        setSystolicValue(value2);
        const datasetLabel2 = chartData.datasets[0].label; // Dataset name
        const value3 = chartData.datasets[1].data[index]; // Value
        setDiastolic(value3);
        const datasetLabel3 = chartData.datasets[1].label; // Dataset name
        const value4 = diagnosticData[index].respiratory;

        // Log the clicked point's details
        console.log(`Clicked on:`);
        // console.log(`- Month: ${label}`);
        console.log(`- Value: ${value2} and ${value3} and ${value4}`);
        console.log(`- Dataset: ${datasetLabel2} and ${datasetLabel3}`);
      }
    },
  };

  return (
    // <div
    //   style={{
    //     width: "100%",
    //     height:"40vh",
    //     margin: "0 auto",
    //     padding: "20px",
    //     paddingTop: "0px"     
    //   }}
    // >
    //   <h3 style={{ textAlign: "left", paddingLeft: "5%" }}>Blood Pressure</h3>
    //   <Line data={chartData} options={chartOptions} />
      
    // </div>
    <div
    style={{
      width: "100%",
      height:'50vh',
      margin: "0 auto",
      backgroundColor: "#F4F0FE",
      borderRadius: "24px",
    }}
  >
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ width: '70%', height: '40vh' }}>
          
        <Line data={chartData} options={chartOptions} />
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
          <p>Value : {systolicValue}</p>

        </div>
        <div style={{ height: '50%', backgroundColor: 'yellow' }}>
            <p>Diastolic: {diastolic}</p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Graph;

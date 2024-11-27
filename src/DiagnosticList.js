import React, { useEffect, useState } from 'react';
import { fetchData } from './api';
import styles from './DiagnosticList.module.css';

const DiagnosticList = () => {
  const [diagnosticList, setDiagnosticList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const jessicaData = await fetchData();
      if (jessicaData && jessicaData.length > 0) {
        const diagnosticData = jessicaData[0]?.diagnostic_list || [];
        setDiagnosticList(diagnosticData);
      }
      setLoading(false);
    };

    getData();
  }, []);

  if (loading) return <div className={styles.noData}>Loading...</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Diagnostic List</h2>
      
      {/* Separate Header */}
      <div className={styles.headerContainer}>
        <div className={`${styles.th} ${styles.column1}`}>Problem/Diagnosis</div>
        <div className={`${styles.th} ${styles.column2}`}>Description</div>
        <div className={`${styles.th} ${styles.column3}`}>Status</div>
      </div>

      {/* Table Body */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <tbody>
            {diagnosticList.length > 0 ? (
              diagnosticList.map((item, index) => (
                <tr key={index} className={styles.tr}>
                  <td className={`${styles.td} ${styles.column1}`} style={{width:'161px'}}>{item.name}</td>
                  <td className={`${styles.td} ${styles.column2}`}>{item.description}</td>
                  <td className={`${styles.td} ${styles.column3}`}>{item.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className={styles.noData}>
                  No diagnostic data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiagnosticList;

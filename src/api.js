export const fetchData = async () => {
    const url = 'https://fedskillstest.coalitiontechnologies.workers.dev';
    const username = process.env.REACT_APP_API_USERNAME;
    const password = process.env.REACT_APP_API_PASSWORD;
    const credentials = btoa(`${username}:${password}`);
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      
      const jessicaData = data.filter((item) => item.name === 'Jessica Taylor');
      return jessicaData;
    } catch (error) {
      console.error('Error fetching Jessica Taylor data:', error);
      return null;
    }
  };
  
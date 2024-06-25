// utils/fetchHotelData.js

const fetchHotelData = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
  
    try {
      const response = await fetch("https://v1.nocodeapi.com/tugay/google_sheets/nuKhgbQuEidqDKQA?tabId=hotel_data_v1", requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const originalHotelData = JSON.parse(JSON.stringify(data));
      console.log(originalHotelData);  // Log the data to console or process it further
      return originalHotelData;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Propagate the error back to the caller
    }
  };
  
  export default fetchHotelData;
  
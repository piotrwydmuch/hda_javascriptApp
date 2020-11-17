const DB_URL = 'http://localhost:3000/db';

fetch(DB_URL)
  .then(response => {
     const contentType = response.headers.get('content-type');
     if (!contentType || !contentType.includes('application/json')) {
       throw new TypeError("Error");
     }
     return response.json();
  })
  .then(data => {
      console.log(data)
  })
  .catch(error => console.error(error));






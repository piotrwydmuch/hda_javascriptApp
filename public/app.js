const DB_URL = 'http://localhost:3000/db';
const searchInput = document.getElementById('searchInput');
const ageInput = document.getElementById('ageInput');
const nameInput = document.getElementById('nameInput');
const peopleDataList = document.getElementById('people');
const statusInfo = document.getElementById('statusInfo');
const urlUserStatus = window.location.search.split('=');
let people = [];
let datalistArr = [];

fetch(DB_URL)
.then(response => {
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Error");
    }
    return response.json();
})
.then(data => {
    people = data.db.people;
    console.log(people);
})
.catch(error => console.error(error));

searchInput.addEventListener("input", () => {

  people.map(person => {
    
    const searchingValue = searchInput.value;
    const searchingValueLowCase = searchingValue.toLowerCase()
    const [userName, userAge] = [person.name, person.age]
    const userNameLowCase = userName.toLowerCase();

    if (!searchingValue) { // When Search input is empty - clear all
      
      const dataListOptions = Array.from(peopleDataList.childNodes);
      
      dataListOptions.forEach(person => {
        person.remove();
        datalistArr = [];
        searchInput.blur();
        searchInput.focus();
      });
    } else if (userNameLowCase.includes(searchingValueLowCase) 
      || searchingValue > 0) { // If any sign is found in fetched data
      if (!datalistArr.includes(userName)) { // Avoid duplicate options
        const newOption = document.createElement("option");
        newOption.value = `${userName} - ${userAge}`;
        peopleDataList.appendChild(newOption);
        datalistArr.push(userName);
      }
    } 
  })
})

if (urlUserStatus.includes("added")) statusInfo.innerHTML = "User aded";
statusInfo.addEventListener("click", () => statusInfo.innerHTML = "");
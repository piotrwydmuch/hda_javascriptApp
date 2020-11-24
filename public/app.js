const DB_URL = 'http://localhost:3000/db';
const searchInput = document.getElementById('searchInput');
const nameInput = document.getElementById('nameInput');
const submitBtn = document.getElementById('submitBtn');
const peopleDataList = document.getElementById('people');
const statusInfo = document.getElementById('statusInfo');
const urlUserStatus = window.location.search.split('=');
let people = [];
let datalistArr = [];

//Fetching data from Database
fetch(DB_URL)
.then(response => {
    const contentType = response.headers.get("content-type");
    if (!contentType 
      || !contentType.includes("application/json")) {
      throw new TypeError("Error");
    }
    return response.json();
})
.then(data => {
    people = data.people;
})
.catch(error => console.error(error));

//Additional Validate New Name - cant be the same like the others
nameInput.addEventListener("change", () => {
  people.forEach((person) => {

    const personName = person.name.toLowerCase();
    const nameInputVal = nameInput.value.toLowerCase();

    // Input value have to be unique
    if (nameInputVal === personName || nameInputVal > 0) {
      statusInfo.innerHTML = "User with this name exist. Try another one.";
      submitBtn.disabled = true;
      
      // If user change this uncorrect value, info will disappear
      nameInput.addEventListener("input", () => {
        statusInfo.innerHTML = "";
        submitBtn.disabled = false;
      }) 
    }
  })
})

//Run event when user try to find our data
searchInput.addEventListener("input", () => {

  people.map(person => {

    const searchingValueLowCase = searchInput.value.toLowerCase();
    const [userName, userAge] = [person.name, person.age];
    const userNameLowCase = userName.toLowerCase();

    if (!searchingValueLowCase) { // When Search input is empty - clear all

      const dataListOptions = Array.from(peopleDataList.childNodes);
      
      dataListOptions.forEach(person => {
        person.remove();
        datalistArr = [];
        searchInput.blur();
        searchInput.focus();
      });

    } else if (userNameLowCase.includes(searchingValueLowCase) 
      || searchingValueLowCase > 0) { // If any sign is found in fetched data
      if (!datalistArr.includes(userName)) { // Avoid duplicate options

        const newOption = document.createElement("option");

        newOption.value = `${userName} - ${userAge}`;
        datalistArr.push(userName);
        peopleDataList.appendChild(newOption);
      }
    } 
  })
})

//Set status about succes if in URL is query string 'added'
if (urlUserStatus.includes("added")) statusInfo.innerHTML = "User aded";
statusInfo.addEventListener("click", () => statusInfo.innerHTML = "");
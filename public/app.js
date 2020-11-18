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
    people = data.people;
    // console.log(people);
})
.catch(error => console.error(error));

searchInput.addEventListener("input", () => {
  people.map(person => {
    if (!searchInput.value) {
      Array.from(peopleDataList.childNodes).forEach(person => {
        person.remove();
        datalistArr = [];
        searchInput.blur();
        searchInput.focus();
      });
    } else if (person.name.toLowerCase().includes(searchInput.value.toLowerCase()) || searchInput.value > 0) {
      if (!datalistArr.includes(person.name)) {
        const newOption = document.createElement("option");
        newOption.value = `${person.name} - ${person.age}`;
        peopleDataList.appendChild(newOption);
        datalistArr.push(person.name);
      }
    } 
  })
})

if (urlUserStatus.includes("added")) statusInfo.innerHTML = "User aded";
statusInfo.addEventListener("click", () => statusInfo.innerHTML = "");
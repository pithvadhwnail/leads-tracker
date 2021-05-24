// declare constants
const inputEl = document.querySelector(".input-el");
const saveInputBtn = document.querySelector(".save-input-btn");
const saveTabBtn = document.querySelector(".save-tab-btn");
const deleteBtn = document.querySelector(".delete-btn");
const listEl = document.querySelector(".list-el");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

// declare variables
let myLeads = [];

// declare functions
function render(leads) {
  let temp = "";
  for (let i = 0; i < leads.length; i++) {
    temp += `
      <li>
        <a href = "${leads[i]}" target = "_blank">
          ${leads[i]}
        </a>
      </li>
    `;
  }
  listEl.innerHTML = temp;
}

function getInputText(inputElement, arr) {
  let temp = inputElement.value;
  arr.push(temp);
  inputElement.value = null;
  localStorage.setItem("myLeads", JSON.stringify(arr));
  render(arr);
}

function saveTab(arr) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    arr.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(arr));
    render(arr);
  });
}

function deleteLeads(arr, listElement) {
  localStorage.clear();
  listElement.innerHTML = null;
  arr = [];
}

// PROGRAM STARTS
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

// save input button
saveInputBtn.addEventListener("click", function () {
  getInputText(inputEl, myLeads);
});

// save tab button
saveTabBtn.addEventListener("click", function () {
  saveTab(myLeads);
});

// delete button
deleteBtn.addEventListener("dblclick", function () {
  deleteLeads(myLeads, listEl);
});

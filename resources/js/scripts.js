

// Admin Status & Ops Feed Functions
function opsUpdate() {
  // Prevent default submissions
  event.preventDefault();
  // Get input value from "adStat" field
  const adStat = document.getElementById('adStat').value.trim();
  // If input is empty, do nothing
  if (adStat === "") {
    return;
  }

  // Create new li, appending the input value
  const listItem = document.createElement('li');
  listItem.innerHTML = linkMaker(adStat);

  // Get the ul element with id "ops"
  const opsList = document.getElementById('ops');

  const totalItems = opsList.getElementsByTagName("li");
  const sumItems = totalItems.length;

  if (sumItems >= 13) {
    // If there are 13 list items, remove the last one
    opsList.removeChild(totalItems[sumItems - 1]);
  }

  // Add the new list item to the beginning of ul element
  opsList.insertBefore(listItem, opsList.firstChild);

  // Save list items to local storage
  cacheInputs();

  // Clear the input field for the next entry
  document.getElementById("adStat").value = "";
}

function cacheInputs() {
  const opsList = document.getElementById('ops');
  const listItems = opsList.getElementsByTagName("li");
  
  const listValues = [];
  
  for (let i = 0; i < listItems.length; i++) {
    listValues.push(listItems[i].textContent);
  }

  // Save the list items to local storage
  localStorage.setItem("listItems", JSON.stringify(listValues));
}

document.addEventListener("DOMContentLoaded", function () {
  // Load the list items from localStorage
  loadCache();
});

function loadCache() {
  const opsList = document.getElementById('ops');
  const storedListItems = localStorage.getItem("listItems");

  if (storedListItems) {
    const listValues = JSON.parse(storedListItems);
    // Clear the existing list items before loading the saved ones
    opsList.innerHTML = ""; 

    listValues.forEach(function (value) {
      const listItem = document.createElement('li');
      // Keep URLs clickable upon page refresh
      listItem.innerHTML = linkMaker(value); 
      opsList.appendChild(listItem);
    });
  }
}

// Ensures URL inputs are clickable
function linkMaker(text) {
  const urlRegex = /https?:\/\/[^\s]+/g; // Regular expression to match URLs

  // Appends URL inputs as clickable anchors
  const linkedText = text.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank">${url}</a>`;
  });

  return linkedText;
}

// Event listener for cache clear
document.getElementById("clearBtn").addEventListener("click", clearData);

function clearData() {
  const opsList = document.getElementById('ops');
  opsList.innerHTML = "";
  // Clear the localStorage
  localStorage.removeItem("listItems");
}






// Show form when click new data button
document.getElementById("newDataBtn").addEventListener("click", function () {
  document.getElementById("newDataForm").classList.remove("hidden");
});

// Hide form when click cancel button
document.getElementById("cancelBtn").addEventListener("click", function () {
  document.getElementById("newDataForm").classList.add("hidden");
});

// Hide form when click outside of form
document.addEventListener("click", function (event) {
  const newDataForm = document.getElementById("newDataForm");
  const newDataBtn = document.getElementById("newDataBtn");

  if (
    !newDataForm.contains(event.target) &&
    !newDataBtn.contains(event.target)
  ) {
    newDataForm.classList.add("hidden");
  }
});

// Add new row to table on form submit
document
  .getElementById("newDataFormElement")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const department = document.getElementById("department").value;
    const dataSubjectType = document.getElementById("dataSubjectType").value;

    // Create a new row
    const newRow = document.createElement("tr");

    // Create cells for the row
    const titleCell = document.createElement("td");
    titleCell.textContent = title;

    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = description;

    const departmentCell = document.createElement("td");
    departmentCell.textContent = department;

    const dataSubjectTypeCell = document.createElement("td");
    dataSubjectTypeCell.textContent = dataSubjectType;

    // create action cell
    const actionsCell = document.createElement("td");
    actionsCell.classList.add("actions");
    actionsCell.innerHTML = `<button class="edit">✏️</button>`;
    actionsCell.innerHTML += `<button class="delete">🗑️</button>`;

    // Append cells to the row
    newRow.appendChild(titleCell);
    newRow.appendChild(descriptionCell);
    newRow.appendChild(departmentCell);
    newRow.appendChild(dataSubjectTypeCell);
    newRow.appendChild(actionsCell);

    // Append the new row to the table
    document.getElementById("tableBody").appendChild(newRow);

    // Clear form values
    document.getElementById("newDataFormElement").reset();

    // Hide the form
    document.getElementById("newDataForm").classList.add("hidden");
  });

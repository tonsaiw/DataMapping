// CLICK new data button = show form
document.getElementById("newDataBtn").addEventListener("click", function () {
  document.getElementById("newDataForm").classList.remove("hidden");
  document.getElementById("overlay").classList.remove("hidden");
});

// CLICK cancel button in form = hide form
document.getElementById("cancelBtn").addEventListener("click", function () {
  document.getElementById("newDataForm").classList.add("hidden");
  document.getElementById("newDataFormElement").reset(); // Clear form values
  document.getElementById("overlay").classList.add("hidden");
});

// CLICK outside of form = hide form
// document.addEventListener("click", function (event) {
//   const newDataForm = document.getElementById("newDataForm");
//   const newDataBtn = document.getElementById("newDataBtn");
//   if (
//     !newDataForm.contains(event.target) &&
//     !newDataBtn.contains(event.target) &&
//     !event.target.classList.contains("edit-btn")
//   ) {
//     newDataForm.classList.add("hidden");
//     document.getElementById("newDataFormElement").reset();
//   }
// });

// CLICK delete button(🗑️) = delete row
document
  .getElementById("tableBody")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
      event.target.parentElement.parentElement.remove();
    }
  });

// CLICK edit button = edit row
let editRow = null;
function attachEditEventListeners() {
  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      editRow = event.target.parentElement.parentElement; // Get the row that contains the clicked Edit button
      const rowData = Array.from(editRow.children); // create array of all children in row

      // Add the data from the row-edit to the form
      document.getElementById("title").value = rowData[0].textContent;
      document.getElementById("description").value = rowData[1].textContent;
      document.getElementById("department").value = rowData[2].textContent;
      document.getElementById("dataSubjectType").value = rowData[3].textContent;

      // Show the form to edit the data
      document.getElementById("newDataForm").classList.remove("hidden");
    });
  });
}

// CLICK submit in form = adding new data and editing existing data
document
  .getElementById("newDataFormElement")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const department = document.getElementById("department").value;
    const dataSubjectType = document.getElementById("dataSubjectType").value;

    if (editRow) {
      // If submit editing, update the row data
      editRow.children[0].textContent = title;
      editRow.children[1].textContent = description;
      editRow.children[2].textContent = department;
      editRow.children[3].textContent = dataSubjectType;
      editRow = null; // Reset editRow after editing
    } else {
      // create a new row
      const tableBody = document.getElementById("tableBody");
      const newRow = document.createElement("tr");

      newRow.innerHTML = `
        <td>${title}</td>
        <td>${description}</td>
        <td>${department}</td>
        <td>${dataSubjectType}</td>
        <td class="actions">
          <button class="edit-btn">✏️</button>
            <button class="delete-btn">🗑️</button>
        </td>
      `;
      tableBody.appendChild(newRow);

      // Attach event listeners to the new buttons
      attachEditEventListeners();
    }

    // Hide the form and reset inputs
    document.getElementById("newDataForm").classList.add("hidden");
    document.getElementById("newDataFormElement").reset();
  });

// Initial call to attach Edit event listeners to any existing rows
attachEditEventListeners();

// Toggle Filter Form
document.getElementById("filterToggle").addEventListener("click", function () {
  const filterForm = document.getElementById("filterForm");
  filterForm.classList.toggle("hidden");
  document.getElementById("overlay").classList.remove("hidden");
});

// Apply Filter Logic
document
  .getElementById("applyFilterBtn")
  .addEventListener("click", function () {
    const selectedDepartments = Array.from(
      document.querySelectorAll("#filterDepartments input:checked")
    ).map((checkbox) => checkbox.value);
    console.log("selectedDepartments : ", selectedDepartments);

    const selectedDataSubjects = Array.from(
      document.querySelectorAll("#filterDataSubjectType input:checked")
    ).map((checkbox) => checkbox.value);
    console.log("selectedDataSubjects : ", selectedDataSubjects);

    const table = document.getElementById("dataTable");
    const rows = table.querySelectorAll("tbody tr");
    console.log("rows : ", rows);

    rows.forEach((row) => {
      const department = row.children[2].textContent;
      const dataSubject = row.children[3].textContent;

      const departmentMatch =
        selectedDepartments.length === 0 ||
        selectedDepartments.includes(department);
      const dataSubjectMatch =
        selectedDataSubjects.length === 0 ||
        selectedDataSubjects.includes(dataSubject);

      if (departmentMatch && dataSubjectMatch) {
        row.style.display = ""; // Show row if matches
      } else {
        row.style.display = "none"; // Hide row if doesn't match
      }
    });
  });

// Reset Filter Logic
document
  .getElementById("resetFilterBtn")
  .addEventListener("click", function () {
    // Uncheck all checkboxes
    document
      .querySelectorAll("#filterDepartments input")
      .forEach((checkbox) => (checkbox.checked = false));
    document
      .querySelectorAll("#filterDataSubjectType input")
      .forEach((checkbox) => (checkbox.checked = false));

    // Show all rows again
    const rows = document.querySelectorAll("#dataTable tbody tr");
    rows.forEach((row) => {
      row.style.display = "";
    });
  });

// Click overlay background = hide all form
document.getElementById("overlay").addEventListener("click", function () {
  document.getElementById("overlay").classList.add("hidden");
  if (
    document.getElementById("newDataForm").classList.contains("hidden") == false
  ) {
    document.getElementById("newDataForm").classList.add("hidden");
    document.getElementById("newDataFormElement").reset();
  }
  if (
    document.getElementById("filterForm").classList.contains("hidden") == false
  ) {
    document.getElementById("filterForm").classList.add("hidden");
  }
});

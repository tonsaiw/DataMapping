// Initalize editRow to null for tracking which row is being edited
let editRow = null;

// Initialize an empty array to store selected tags
let selectedTags = [];

// CLICK new data button = show form
document.getElementById("newDataBtn").addEventListener("click", function () {
  document.getElementById("formTitle").textContent = "New Data";
  // Clear tags
  document.getElementById("tags-container").innerHTML = "";
  selectedTags = [];
  document.getElementById("newDataFormElement").reset();
  editRow = null; // Reset editRow
  document.getElementById("newDataForm").classList.remove("hidden");
  document.getElementById("overlay").classList.remove("hidden");
});

// CLICK cancel button in form = hide form
document.getElementById("cancelBtn").addEventListener("click", function () {
  document.getElementById("newDataForm").classList.add("hidden");
  document.getElementById("overlay").classList.add("hidden");
});

// Click overlay background = hide all form
document.getElementById("overlay").addEventListener("click", function () {
  document.getElementById("overlay").classList.add("hidden");
  // Case: newDataForm is open
  if (
    document.getElementById("newDataForm").classList.contains("hidden") == false
  ) {
    document.getElementById("newDataForm").classList.add("hidden");
  }
  // Case: filterForm is open
  if (
    document.getElementById("filterForm").classList.contains("hidden") == false
  ) {
    document.getElementById("filterForm").classList.add("hidden");
  }
});

// CLICK delete button(🗑️) = delete row
document
  .getElementById("tableBody")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
      event.target.parentElement.parentElement.remove();
    }
  });

// CLICK edit button = edit row
function attachEditEventListeners() {
  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      // Change title of form to "Edit Data"
      document.getElementById("formTitle").textContent = "Edit Data";
      // Clear tags element
      document.getElementById("tags-container").innerHTML = "";

      editRow = event.target.parentElement.parentElement; // Get the row that contains the clicked Edit button
      const rowData = Array.from(editRow.children); // create array of all children element in row

      // Add the data from the row-edit to the form
      document.getElementById("title").value = rowData[0].textContent;
      document.getElementById("description").value = rowData[1].textContent;
      document.getElementById("department").value = rowData[2].textContent;

      selectedTags = rowData[3].textContent.split(", ");
      selectedTags = selectedTags.filter((tag) => tag !== ""); // Remove any empty strings
      // Add the tags to the form
      selectedTags.forEach((value) => {
        // Create a tag element
        const tagElement = document.createElement("div");
        tagElement.classList.add("tag");
        tagElement.setAttribute("data-value", value);
        tagElement.innerHTML = `${value} <span class="remove-tag">x</span>`;

        // Add remove-tag event listener when click on x
        tagElement
          .querySelector(".remove-tag")
          .addEventListener("click", function () {
            toggleTag(value);
          });
        document.getElementById("tags-container").appendChild(tagElement);
      });

      // Show the form to edit the data
      document.getElementById("newDataForm").classList.remove("hidden");
      document.getElementById("overlay").classList.remove("hidden");
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
    const dataSubjectType = selectedTags.join(", ");
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
    document.getElementById("overlay").classList.add("hidden");

    // Change title of form back to "New Data"
    document.getElementById("formTitle").textContent = "New Data";
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

    const selectedDataSubjects = Array.from(
      document.querySelectorAll("#filterDataSubjectType input:checked")
    ).map((checkbox) => checkbox.value);

    const searchTitle = document.getElementById("filterTitle").value.trim();
    const regex = new RegExp(searchTitle, "i"); // Case-insensitive regex

    const table = document.getElementById("dataTable");
    const rows = table.querySelectorAll("tbody tr");

    rows.forEach((row) => {
      const title = row.children[0].textContent;
      const department = row.children[2].textContent;
      const departmentMatch =
        selectedDepartments.length === 0 ||
        selectedDepartments.includes(department);

      const dataSubject = row.children[3].textContent;

      let dataSubjectMatch = null;
      if (dataSubject.includes(", ")) {
        const dataSubjectArr = dataSubject.split(", ");
        dataSubjectMatch =
          selectedDataSubjects.length === 0 ||
          dataSubjectArr.some((dataSubject) =>
            selectedDataSubjects.includes(dataSubject)
          );
      } else {
        dataSubjectMatch =
          selectedDataSubjects.length === 0 ||
          selectedDataSubjects.includes(dataSubject);
      }
      const titleMatch = searchTitle === "" || regex.test(title);

      if (departmentMatch && dataSubjectMatch && titleMatch) {
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

    // Clear the search input
    document.getElementById("filterTitle").value = "";

    // Show all rows again
    const rows = document.querySelectorAll("#dataTable tbody tr");
    rows.forEach((row) => {
      row.style.display = "";
    });
  });

// Function to add or remove tags
function toggleTag(value) {
  const tagsContainer = document.getElementById("tags-container");
  // Check if the tag is already selected
  if (selectedTags.includes(value)) {
    // Remove the tag
    selectedTags = selectedTags.filter((tag) => tag !== value);

    // Find the tag element and remove it
    const tagElement = document.querySelector(`.tag[data-value="${value}"]`);
    if (tagElement) {
      tagsContainer.removeChild(tagElement);
    }
  } else {
    selectedTags.push(value);

    // Create a tag element
    const tagElement = document.createElement("div");
    tagElement.classList.add("tag");
    tagElement.setAttribute("data-value", value);
    tagElement.innerHTML = `${value} <span class="remove-tag">x</span>`;

    // Click remove-tag = remove tag
    tagElement
      .querySelector(".remove-tag")
      .addEventListener("click", function () {
        toggleTag(value);
      });

    tagsContainer.appendChild(tagElement);
  }
}

// Event listener for the select dropdown
document
  .getElementById("dataSubjectType")
  .addEventListener("change", function (event) {
    const value = event.target.value;
    if (value) {
      toggleTag(value);

      // Reset the select value to the placeholder
      event.target.value = "";
    }
  });

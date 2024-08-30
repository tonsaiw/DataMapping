document.getElementById("newDataBtn").addEventListener("click", function () {
  document.getElementById("newDataForm").classList.remove("hidden");
});

document.getElementById("cancelBtn").addEventListener("click", function () {
  document.getElementById("newDataForm").classList.add("hidden");
});

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

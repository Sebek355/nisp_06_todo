const input = document.getElementById("task-input");
const button = document.getElementById("add-btn");
const list = document.getElementById("task-list");

button.addEventListener("click", function () {
  const taskText = input.value.trim();

  if (taskText !== "") {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const span = document.createElement("span");
    span.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";
    deleteBtn.classList.add("delete-btn");

    checkbox.addEventListener("change", function () {
      span.classList.toggle("done");
    });

    deleteBtn.addEventListener("click", function () {
      li.classList.add("removing");

      setTimeout(() => {
        li.remove();
      }, 300);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    list.appendChild(li);

    input.value = "";
  }
});
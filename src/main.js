let token = window.localStorage.getItem("token");
if (!token) {
  window.location.pathname = "./src/login.html";
}

const elBackBtn = document.querySelector(".js-back-btn");

elBackBtn.addEventListener("click", () => {
  window.localStorage.removeItem("token");
  window.location.reload();
});

const elTodoForm = document.querySelector(".js-todo-form"),
  elTododText = elTodoForm.querySelector(".js-todo-input");
const elTodeRenderList = document.querySelector(".js-todo-render-list");

const elEditCard = document.querySelector(".js-edit-card");
const elEditForm = document.querySelector(".js-todo-value-edit"),
  elEditInput = elEditForm.querySelector(".js-edit-input");

const elEditUpdata = document.querySelector(".js-update");
const elDeleted = document.querySelector(".js-delete");

function todoRenderList(arr, node) {
  node.innerHTML = "";
  arr.forEach((item) => {
    node.innerHTML += `        <li
          class="p-3 mb-4 rounded-3xl flex items-center relative border-2 justify-between"
        >
          <span>${item.todo_value}</span>
          <div>
            <button
              class="absolute top-0 py-3 px-4 right-14 border-l-2 js-todo-edit-btn"
              data-id="${item.id}"
            >
              <i class="fa-solid fa-pen-to-square text-blue-600"></i>
            </button>
            <button
              class="absolute top-0 right-0 py-3 px-5 rounded-r-3xl border-l-2 js-delete-btn"
              data-id="${item.id}"
            >
              <i class="fa-solid fa-trash text-red-600"></i>
            </button>
          </div>
        </li>`;
  });
}

// Todo POST
async function todoPostData() {
  try {
    let res = await fetch("http://192.168.1.105:5000/todo", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        text: elTododText.value.trim(),
      }),
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    let data = await res.json();
    todoGetData();
  } catch (error) {
    console.log(error);
  }
}

// Todo GET
async function todoGetData() {
  try {
    let res = await fetch("http://192.168.1.105:5000/todo", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    let data = await res.json();
    todoRenderList(data, elTodeRenderList);
  } catch (error) {
    console.log(error);
  }
}

// Todo PUT
async function todoPutData(id, editTodo) {
  todoEditFn(id);
  try {
    let res = await fetch(`http://192.168.1.105:5000/todo/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        text: editTodo,
      }),
    });
    let data = await res.json();
    console.log(data);
    todoGetData();
  } catch (error) {
    console.log(error);
  }
}

// Edit fn
function todoEditFn(id) {
  elEditForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    let editVal = elEditInput.value.trim();
    if (editVal) {
      todoPutData(id, editVal);
      elEditCard.style.display = "none";
      const setTimId = setTimeout(() => {
        elEditUpdata.classList.add("all");
      }, 500);

      setTimeout(() => {
        clearTimeout(setTimId);
        elEditUpdata.classList.remove("all");
      }, 2000);
    } else {
      console.log("Matn kiritilmagan!");
    }
  });
}
todoEditFn();
// Todo DELETE
async function todoDeleteData(id) {
  try {
    let res = await fetch(`http://192.168.1.105:5000/todo/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });
    let data = await res.json();
    console.log(data);
    todoGetData();
  } catch (error) {
    console.log(error);
  }
}
elTodeRenderList.addEventListener("click", (evt) => {
  if (evt.target.closest(".js-todo-edit-btn")) {
    let todoId = evt.target.closest(".js-todo-edit-btn").dataset.id;
    todoPutData(todoId);
    elEditCard.style.display = "block";
  }

  if (evt.target.closest(".js-delete-btn")) {
    let deleteId = evt.target.closest(".js-delete-btn").dataset.id;
    todoDeleteData(deleteId);
    setTimeout(() => {
      elDeleted.classList.add("all");
    }, 600);

    setTimeout(() => {
      elDeleted.classList.remove("all");
    }, 2200);
  }
});

elTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  todoPostData();
  elTododText.value = "";
});

todoGetData();

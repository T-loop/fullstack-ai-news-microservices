const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

// temp speichern von id message
let currentUpdateId = null;

async function loadNews() {
  const res = await fetch("/news/getallnews", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const news = await res.json();
  const table = document.getElementById("newsTable");
  table.innerHTML = "";

  news.forEach(n => {
    const row = document.createElement("tr");

    const titleTd = document.createElement("td");
    titleTd.textContent = n.title;

    const categoryTd = document.createElement("td");
    categoryTd.textContent = n.category;
///
    const contentTd = document.createElement("td");
    contentTd.textContent = n.content;

    const actionsTd = document.createElement("td");

    const delBtn = document.createElement("button");
    delBtn.classList.add("btn", "btn-danger", "btn-sm", "me-2");
    delBtn.innerHTML = `<i class="bi bi-trash"></i>`;
    delBtn.title = "Delete";
    delBtn.onclick = () => deleteNews(n.messageid);

    const updBtn = document.createElement("button");
    updBtn.classList.add("btn", "btn-warning", "btn-sm");
    updBtn.innerHTML = `<i class="bi bi-pencil-square"></i>`;
    updBtn.title = "Update";
    updBtn.onclick = () => fillForm(n.title, n.content, n.messageid);

    actionsTd.append(delBtn, updBtn);
    row.append(titleTd, categoryTd, contentTd, actionsTd);
    table.appendChild(row);
  });
}

function fillForm(title, content, id) {
  document.getElementById("title").value = title;
  document.getElementById("content").value = content;

  document.getElementById("title").hidden = false;
  document.getElementById("content").hidden = false;

  document.getElementById("post").hidden = true;
  document.getElementById("update").hidden = false;

  document.getElementById("post").disabled = true;
  document.getElementById("update").disabled = false;

  currentUpdateId = id;
}


/*async function postNews() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  await fetch("/news/postnews", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, content })
  });

  clearForm();
  loadNews();
}
  */

async function updateNews() {
  if (!currentUpdateId) return;
   
  alert("sicher Willst du updaten");

  const title = document.getElementById("title").value;
  
  const content = document.getElementById("content").value;

  await fetch(`/news/updatenews/${currentUpdateId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, content })
  });

  clearForm();
  loadNews();
}

async function deleteNews(id) {
  await fetch(`/news/deletenews/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  loadNews();
}

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("content").value = "";

  document.getElementById("title").hidden = true;
  document.getElementById("content").hidden = true;

  document.getElementById("post").hidden = true;
  document.getElementById("update").hidden = true;

  document.getElementById("post").disabled = true;
  document.getElementById("update").disabled = true;

  currentUpdateId = null;
}


function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

loadNews();
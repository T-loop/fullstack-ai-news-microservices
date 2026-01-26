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

    const contentTd = document.createElement("td");
    contentTd.textContent = n.content;

    const actionsTd = document.createElement("td");

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => deleteNews(n.messageid);

    const updBtn = document.createElement("button");
    updBtn.textContent = "Update";
    updBtn.onclick = () => fillForm(n.title, n.content, n.messageid);

    actionsTd.append(delBtn, updBtn);
    row.append(titleTd, categoryTd, contentTd, actionsTd);
    table.appendChild(row);
  });
}

function fillForm(title, content, id) {
  document.getElementById("title").value = title;
  document.getElementById("content").value = content;
  currentUpdateId = id;
  document.getElementById("post").disabled = true; 
  
  document.getElementById("update").disabled = false;

}

async function postNews() {
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

async function updateNews() {
  if (!currentUpdateId) return;

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
  currentUpdateId = null;

  document.getElementById("post").disabled = false;
  document.getElementById("update").disabled = true;
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

loadNews();

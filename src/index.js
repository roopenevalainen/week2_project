class User {
  constructor(username, email, address, isAdmin) {
    this.username = username;
    this.email = email;
    this.address = address;
    this.isAdmin = isAdmin;
  }

  get username() {
    return this._username;
  }
  get email() {
    return this._email;
  }
  get address() {
    return this._address;
  }
  get isAdmin() {
    return this._isAdmin;
  }

  set username(username) {
    this._username = username;
  }
  set email(email) {
    this._email = email;
  }
  set address(address) {
    this._address = address;
  }
  set isAdmin(isAdmin) {
    this._isAdmin = isAdmin;
  }
}

if (document.readyState !== "loading") {
  console.log("Document is ready!");
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("Document is ready after waiting!");
    initializeCode();
  });
}

function initializeCode() {
  const submitButton = document.getElementById("submit-data");
  const removeButton = document.getElementById("empty-table");
  let table = document.getElementById("input-tbody");
  let userList = getDataFromTable(table);
  /*let user1 = new User("RoopeN", "roope@lut.fi", "Skinnarila", true);
  let user2 = new User("PekkaP", "pekka@lut.fi","Sammonlahti", false);
  let user3 = new User("JaakkoK","jaakko@lut.fi","Pallo", false);*/

  submitButton.addEventListener("click", function () {
    const username = document.getElementById("input-username");
    const email = document.getElementById("input-email");
    const address = document.getElementById("input-address");
    const isAdmin = document.getElementById("input-admin");
    let user = new User(
      username.value,
      email.value,
      address.value,
      isAdmin.checked
    );
    console.log(userExists(userList, username));

    if (userExists(userList, username) === false) {
      userList.push(user);
      console.log("ok2");
    } else {
      console.log("ok");
      userList = editUser(userList, user);
    }

    /*if (userExists(userList, username) !== false && (userList.length > 0)) {
      userList = editUser(editUser(userList, user));
      console.log("ok")
    } else {
      userList.push(user);
    }*/

    buildTable(userList);
  });

  removeButton.addEventListener("click", function () {
    let table = document.getElementById("input-table");
    table.innerHTML = "";
    userList = [];
  });
}

function buildTable(userList) {
  let table = document.getElementById("input-table");
  table.innerHTML = "";
  console.log(userList);
  for (let i = 0; i < userList.length; i++) {
    let formattedIsAdmin = "";
    if (userList[i].isAdmin === true) {
      formattedIsAdmin = "X";
    } else {
      formattedIsAdmin = "-";
    }
    let row = `<tr>
                    <td>${userList[i].username}</td>
                    <td>${userList[i].email}</td>
                    <td>${userList[i].address}</td>
                    <td>${formattedIsAdmin}</td>
                  </tr>`;
    table.innerHTML += row;
  }
}

function userExists(userList, formUsername) {
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].username === formUsername.value) {
      //console.log("ok");
      return true;
    }
  }
  return false;
}

function editUser(userList, currentUser) {
  console.log(userList[currentUser.username]);
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].username === currentUser.username) {
      userList[i].email = currentUser.email;
      userList[i].address = currentUser.address;
      userList[i].isAdmin = currentUser.isAdmin;
    }
  }

  return userList;
}

function getDataFromTable(table) {
  let userList = [];
  for (let i = 0; i < table.rows.length; i++) {
    const username = table.rows[i].cells[0].innerHTML;
    const email = table.rows[i].cells[1].innerHTML;
    const address = table.rows[i].cells[2].innerHTML;
    let isAdmin = table.rows[i].cells[3].innerHTML;
    if (isAdmin === "X") {
      isAdmin = true;
    } else {
      isAdmin = false;
    }

    let user = new User(username, email, address, isAdmin);
    userList.push(user);
  }
  return userList;
}
//references:
//https://www.youtube.com/watch?v=XmdOZ5NSqb8

const input = document.querySelector(".input");
const tbody = document.querySelector(".tbody");
const modal = document.querySelector(".modal");
const form = document.querySelector(".form");

form.onsubmit = async () => {
  const passport = {
    name: form["name"].value,
    serial: form["serial"].value,
    age: form["age"].value,
  };
  if(!passport.name && !passport.age && !passport.serial){
    alert('заполните все данные')
    return false;
  }

  await fetch("http://localhost:5000/createpassport", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ passport }),
  });
};

const addRowTable = (data) => {
  tbody.style.display = 'table'
  let tr = `
    <tr>
    <td style="padding: 5px">${data.name}</td>
    <td style="padding: 5px">${data.age}</td>
    <td style="padding: 5px">${data.serial}</td>
    <td style="padding: 5px">${data.hash}</td>
    </tr>`;

  tbody.insertAdjacentHTML("beforeend", tr);
};

const findPassport = async () => {
  const value = input.value;
  input.value = "";
  if(!value){
    alert('введите для поиска')
    return;
  }
  const response = await fetch("http://localhost:5000/getpassport", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value }),
  });

  response
    .json()
    .then((res) => addRowTable(res))
    .catch((err) => console.log(err));
};


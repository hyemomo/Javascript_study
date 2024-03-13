const form = document.querySelector(".form");
const popup_btn = document.querySelector(".popup_btn");
const popup_name = document.querySelector(".popup_name");
const popup_price = document.querySelector(".popup_price");
const ul = document.querySelector(".itemList");

const total_balance = document.querySelector(".total_balance");
const total_income = document.querySelector(".total_income");
const total_expenses = document.querySelector(".total_expenses");

const date = document.querySelector(".date");
const trash = document.querySelector(".fa-trash");

let balance = 0;
let income = 0;
let expenses = 0;

let item_name;
let item_price;
let item_type;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (popup_name.value === "") {
    alert("종류를 입력하세요");
  } else if (popup_price.value === 0) {
    alert("가격을 입력하세요");
  } else {
    //가격이랑 종류가 입력되면
    item_name = popup_name.value;
    item_price = parseInt(popup_price.value);
    item_type = document.querySelector('input[name="type"]:checked').value;

    makeItem();
    updateMoney();

    popup_name.value = "";
    popup_price.value = "";
  }
});

const init = () => {
  total_balance.textContent = `${balance}원`;
  total_income.textContent = `수입 ${income}원`;
  total_expenses.textContent = `지출 ${expenses}원`;

  let today = new Date();
  date.textContent = `${today.getFullYear()}년 ${
    today.getMonth() + 1
  }월 ${today.getDate()}일`;
};

function makeItem() {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const i = document.createElement("i");
  if (item_type === "income") {
    li.classList.add("green");
    li.setAttribute("id", `${self.crypto.randomUUID()}`);
  }
  i.classList.add("fa");
  i.classList.add("fa-trash");
// hgkjh
  span.innerHTML = `${
    item_type === "income" ? "수입" : "지출"
  }    ${item_price}원 : ${item_name}`;
  li.append(span);
  li.append(i);

  ul.appendChild(li);
}

const updateMoney = () => {
  if (item_type === "income") {
    balance += item_price;
    income += item_price;
  } else if (item_type === "expenses") {
    balance -= item_price;
    expenses += item_price;
  }
  total_balance.textContent = `${balance}원`;
  total_income.textContent = `수입 ${income}원`;
  total_expenses.textContent = `지출 ${expenses}원`;
};

init();

trash.addEventListener("click", () => {
  console.log("");
});

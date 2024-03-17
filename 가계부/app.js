const form = document.querySelector(".form");
const popup_btn = document.querySelector(".popup_btn");
const popup_name = document.querySelector(".popup_name");
const popup_price = document.querySelector(".popup_price");
const ul = document.querySelector(".itemList");

const total_balance = document.querySelector(".total_balance");
const total_income = document.querySelector(".total_income");
const total_expenses = document.querySelector(".total_expenses");
const date = document.querySelector(".date");
let historyArr = [];

function getHistoryObj(type, text, price) {
  //오브젝트들을 생성
  return { id: String(Date.now()), type: type, text: text, price: price };
}
function saveHistory(history) {
  // 오브젝트를 배열에 추가
  historyArr.push(history);
}
function saveLS() {
  localStorage.setItem("history", JSON.stringify(historyArr));
  // historyArr을 파일 형식으로 저장하고
  // 로컬 스토리지에 history라는 이름으로 저장하기
}

function loadLS() {
  // 로컬 스토리지에서 가져옴
  historyArr = JSON.parse(localStorage.getItem("history")) || [];
}
function restoreState() {
  //배열 값들을 갱신해 출력
  historyArr.forEach(function (item) {
    paintHistory(item);
  });
}

function submitForm() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (popup_name.value === "") {
      alert("종류를 입력하세요");
    } else if (popup_price.value === 0) {
      alert("가격을 입력하세요");
    } else {
      //가격이랑 종류가 입력되면
      let item_name = popup_name.value;
      let item_price = parseInt(popup_price.value);
      let item_type = document.querySelector(
        'input[name="type"]:checked'
      ).value;

      const historyObj = getHistoryObj(item_type, item_name, item_price);
      saveHistory(historyObj);
      saveLS();
      console.log(historyObj);
      console.log(historyArr);

      popup_name.value = "";
      popup_price.value = "";

      addItem(item_type, item_name, item_price);
      updateMoney();
    }
  });
}

const init = () => {
  let balance = 0;
  let income = 0;
  let expenses = 0;
  updateMoney();
  let today = new Date();
  date.textContent = `${today.getFullYear()}년 ${
    today.getMonth() + 1
  }월 ${today.getDate()}일`;

  submitForm();
};

function addItem(item_type, item_name, item_price) {
  const item = document.createElement("li");
  const comment = document.createElement("span");
  const deleteBtn = document.createElement("i");
  if (item_type === "income") {
    item.classList.add("green");
    item.setAttribute("id", `${self.crypto.randomUUID()}`);
  }
  deleteBtn.classList.add("fa");
  deleteBtn.classList.add("fa-trash");

  comment.innerHTML = `${
    item_type === "income" ? "수입" : "지출"
  }    ${item_price}원 : ${item_name}`;
  item.append(comment);
  item.append(deleteBtn);

  ul.appendChild(item);

  deleteBtn.addEventListener("click", (e) => {
    console.log("dj;sf");
    // console.dir(e.target.parentElement)
    e.target.parentElement.remove();

    historyArr = historyArr.filter(function (item) {
      return item.id !== li.id;
    });
  });
}

const updateMoney = () => {
  const price = historyArr.map((item) => Number(item.price));
  // historyArr에 있는 가격들을 숫자로 바꾸기
  const income = historyArr
    .filter((item) => item.type === "income")
    .map((item) => Number(item.price))
    .reduce((acc, cur) => (acc += cur), 0);
  console.log(income);
  const expenses = historyArr
    .filter((item) => item.type === "expenses")
    .map((item) => Number(item.price))
    .reduce((acc, cur) => (acc += cur), 0);
  const balance = income-expenses

  total_balance.textContent = `${balance}원`;
  total_income.textContent = ` ${income}원`;
  total_expenses.textContent = ` ${expenses}원`;
};

init();

const form = document.querySelector("form");
const popup_btn = document.querySelector(".popup_btn");
const content = document.querySelector(".form_content");
const popupArea = document.querySelector(".popup_area");
const popup_name = document.querySelector(".popup_name");
const popup_price = document.querySelector(".popup_price");
const ul = document.querySelector(".itemList");

const total_balance = document.querySelector(".total_balance");
const total_income = document.querySelector(".total_income");
const total_expenses = document.querySelector(".total_expenses");
const date = document.querySelector(".date");
let historyArr = [];

popup_btn.addEventListener("click", (e) => {
  e.preventDefault();
  content.classList.toggle("content_hide");
  popupArea.classList.toggle("show");
  popup_btn.classList.toggle("btn_hide");
});

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


  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (popup_name.value === ""|| popup_price.value === "") {
      popup_btn.classList.toggle("btn_hide");
      content.classList.toggle("content_hide");
      popupArea.classList.toggle("show");
      
    } 
    else {
      //가격이랑 종류가 입력되면
      let item_name = popup_name.value;
      let item_price = parseInt(popup_price.value);
      let item_type = document.querySelector(
        'input[name="type"]:checked'
      ).value;

      const historyObj = getHistoryObj(item_type, item_name, item_price);
      saveHistory(historyObj);
      saveLS();
console.log(historyArr);
console.log(localStorage.getItem("history"));

      popup_name.value = "";
      popup_price.value = "";

      addItem(historyObj.id, item_type, item_name, item_price);
      updateMoney();
      popup_btn.classList.toggle("btn_hide");
      content.classList.toggle("content_hide");
      popupArea.classList.toggle("show");
    }
  });


const init = () => {
  updateMoney();
  let today = new Date();
  date.textContent = `${today.getFullYear()}년 ${
    today.getMonth() + 1
  }월 ${today.getDate()}일`;

  paintHistory();

 
};
function paintHistory(){
 let history=JSON.parse(localStorage.getItem("history"));

  history.forEach((item)=>{addItem(item.id,item.type, item.text, item.price);})
}
function addItem(id, item_type, item_name, item_price) {
  const item = document.createElement("li");
  const comment = document.createElement("span");
  // comment.style = { "max-width": "100px" };
  const deleteBtn = document.createElement("i");
  if (item_type === "income") {
    item.classList.add("green");
    item.setAttribute("id", id);
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
  
    e.target.parentElement.remove();

    historyArr = historyArr.filter(function (item) {
      
      return item.id !== e.target.parentElement.id;
      
   
    });console.log(historyArr)
    saveLS();
    updateMoney();
  });
}

const updateMoney = () => {
  const income = historyArr
    .filter((item) => item.type === "income")
    .map((item) => Number(item.price))
    .reduce((acc, cur) => (acc += cur), 0);
  const expenses = historyArr
    .filter((item) => item.type === "expenses")
    .map((item) => Number(item.price))
    .reduce((acc, cur) => (acc += cur), 0);
  const balance = income - expenses;

  total_balance.textContent = `${balance}원`;
  total_income.textContent = ` ${income}원`;
  total_expenses.textContent = ` ${expenses}원`;
};

init();
console.log(localStorage.getItem("history"))
const form = document.querySelector(".form");
const nameInput = form.querySelector(".submit__name");
const textInput = form.querySelector(".submit__comment");
const dateInput = form.querySelector(".submit__date");
const submitBtn = form.querySelector(".submit__button");

const commentList = document.querySelector(".comment-list");

form.addEventListener("submit", e => {
  e.preventDefault();

  const nameValue = nameInput.value.trim();
  const textValue = textInput.value.trim();
  const dateValue = dateInput.value.trim() || new Date().toISOString();
  console.log(dateValue);

  if (!nameValue) {
    nameInput.classList.add("error");
    return;
  }

  const commentItem = document.createElement("li");
  commentItem.classList.add("comment-item");

  const nameElem = document.createElement("div");
  nameElem.classList.add("comment-name");
  nameElem.textContent = nameValue;

  const textElem = document.createElement("div");
  textElem.classList.add("comment-text");
  textElem.textContent = textValue;

  const dateElem = document.createElement("div");
  dateElem.classList.add("comment-date");
  dateElem.textContent = formatDate(dateValue);

  const likeBtn = document.createElement("button");
  likeBtn.classList.add("like-btn");
  likeBtn.innerHTML = '<i class="fa fa-heart like-btn"></i>';

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = '<i class="fa fa-trash delete-btn"></i>';

  commentItem.appendChild(nameElem);
  commentItem.appendChild(textElem);
  commentItem.appendChild(dateElem);
  commentItem.appendChild(likeBtn);
  commentItem.appendChild(deleteBtn);
  commentList.appendChild(commentItem);

  nameInput.value = "";
  textInput.value = "";
  dateInput.value = "";
});

commentList.addEventListener('click', e => {
  if (e.target.classList.contains('delete-btn')) {
    e.target.closest('.comment-item').remove();
  }
});

commentList.addEventListener('click', e => {
  if (e.target.classList.contains('like-btn')) {
    e.target.classList.toggle('liked');
  }
});



function formatDate(date) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const nowTime = `${today.getHours()}:${today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes()}`


  if (date.slice(0, 10) === today.toISOString().slice(0, 10)) {
    return `сегодня, ${nowTime}`;
  } else if (date === yesterday.toISOString().slice(0, 10)) {
    return `вчера, ${nowTime}`;
  } else {
    const dateDay = date.slice(8, 10)
    const dateMonth = date.slice(5, 7)
    const dateYear = date.slice(0, 4)
    return `${dateDay} ${dateMonth} ${dateYear}, ${nowTime}`;
  }
}
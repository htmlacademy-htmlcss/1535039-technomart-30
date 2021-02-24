const feedbackLink = document.querySelector(".feedback-button");
const mapLink = document.querySelector(".map-link");
const buyLink = document.querySelectorAll(".buy-button");
const feedbackModal = document.querySelector(".feedback-modal");
const mapModal = document.querySelector(".map-modal");
const cartModal = document.querySelector(".cart-modal");
const feedbackForm = document.querySelector(".feedback-form");
const modalBg = document.querySelector(".modal-bg");
const pageBody = document.querySelector(".page-body");
const modal = document.querySelectorAll(".modal");
const modalInput = document.querySelectorAll(".modal-field");

/* Открываем модалки */
for (i = 0; i < buyLink.length; i++) {
  buyLink[i].addEventListener("click", function (evt) {
    evt.preventDefault();
    cartModal.classList.add("modal-show");
    afterShow();
    closeModal();
    closeEsc();
    outClickClose();
  }
)};
feedbackLink.addEventListener("click", function (evt) {
  evt.preventDefault();
  feedbackModal.classList.add("modal-show");
  feedbackModal.classList.remove("feedback-error");
  afterShow();
  modalInput[0].focus();
  closeModal();
  closeEsc();
  outClickClose();
  modalInput.forEach(n => n.classList.remove("input-error"));
});
mapLink.addEventListener("click", function (evt) {
  evt.preventDefault();
  mapModal.classList.add("modal-show");
  afterShow();
  closeModal();
  closeEsc();
  outClickClose();
});
/* проверка формы */
feedbackForm.addEventListener("submit", function (evt) {
  modalInput.forEach(n => n.classList.remove("input-error"));
  let sumError = 0;
  for (i = 0; i < modalInput.length; i++) {
    if (!modalInput[i].value) {
      modalInput[i].classList.add("input-error");
      sumError += 1;
    }
  };
  if (sumError > 0) {
    evt.preventDefault();
    feedbackModal.classList.remove("feedback-error");
    feedbackModal.offsetWidth = feedbackModal.offsetWidth;
    feedbackModal.classList.add("feedback-error");
  } else {
    modalInput.forEach(n => n.value = "");
  };
})
/* Закрытие модалок кнопкой */
function closeModal() {
  for (i = 0; i < modal.length; i++) {
    if (modal[i].classList.contains("modal-show")) {
      const closeButton = modal[i].querySelector(".modal-close");
      const activeModal = modal[i];
      closeButton.addEventListener("click", function (evt) {
        evt.preventDefault();
        activeModal.classList.remove("modal-show");
        afterClose();
      })
    }
  }
};
/* Закрытие по Esc */
function closeEsc() {
  for (i = 0; i < modal.length; i++) {
    if (modal[i].classList.contains("modal-show")) {
      const activeModal = modal[i];
      window.addEventListener("keydown", function (evt) {
        if (evt.key === "Escape") {
          evt.preventDefault();
          activeModal.classList.remove("modal-show");
          afterClose();
        }
      })
    }
  }
};
/* закрытие по нажатию вне модалки */
function outClickClose() {
  for (i = 0; i < modal.length; i++) {
    if (modal[i].classList.contains("modal-show")) {
      const activeModal = modal[i];
      modalBg.addEventListener("click", function (evt) {
        evt.preventDefault();
        activeModal.classList.remove("modal-show");
        afterClose();
      })
    }
  }
};
/* блокируем задний фон */
function afterShow() {
  modalBg.classList.add("modal-bg-show");
  pageBody.classList.add("scroll-block");
};
/* разблокируем задний фон */
function afterClose() {
  modalBg.classList.remove("modal-bg-show");
  pageBody.classList.remove("scroll-block");
  modalInput.forEach(n => n.classList.remove("input-error"));
};


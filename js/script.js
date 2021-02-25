/* скрипты модалок */
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
const inputEmail = document.querySelector("[name=email]");

/* Открываем модалки */
for (i = 0; i < buyLink.length; i++) {
  buyLink[i].addEventListener("click", function (evt) {
    evt.preventDefault();
    cartModal.classList.add("modal-show");
    afterShow();
    closeModal();
    closeEsc();
    outClickClose();
  });
};

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
  console.log("адрес " + inputEmail.value);
  let email = validateEmail(inputEmail.value);
  console.log("проверка почты " + email);
  for (i = 0; i < modalInput.length; i++) {
    if (!modalInput[i].value) {
      modalInput[i].classList.add("input-error");
      sumError += 1;
    };
  };
  if (!email) {
    inputEmail.classList.add("input-error");
    sumError += 1;
  };
  console.log("всего ошибок " + sumError);
  if (sumError > 0) {
    evt.preventDefault();
    feedbackModal.classList.remove("feedback-error");
    feedbackModal.offsetWidth = feedbackModal.offsetWidth;
    feedbackModal.classList.add("feedback-error");
  } else {
    modalInput.forEach(n => n.value = "");
  };
});

/* проверка email */
function validateEmail(email) {
    const re = /.+@.+\..+/i;
    return re.test(String(email).toLowerCase());
};

/* Закрытие модалок кнопкой */
function closeModal() {
  modal.forEach(elem => {
    if (elem.classList.contains("modal-show")) {
      const closeButton = elem.querySelector(".modal-close");
      closeButton.addEventListener("click", function (evt) {
        evt.preventDefault();
        afterClose();
      });
    };
  });
};

/* Закрытие по Esc */
function closeEsc() {
  window.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      evt.preventDefault();
      afterClose();
    };
  });
};

/* закрытие по клику вне модалки */
function outClickClose() {
  modalBg.addEventListener("click", function (evt) {
    evt.preventDefault();
    afterClose();
  });
};

/* блокируем задний фон */
function afterShow() {
  modalBg.classList.add("modal-bg-show");
  pageBody.classList.add("scroll-block");
};

/* разблокируем задний фон */
function afterClose() {
  modal.forEach(elem => {
    if (elem.classList.contains("modal-show")) {
      const activeModal = elem;
      activeModal.classList.add("modal-closing");
      activeModal.addEventListener("animationend", function () {
        activeModal.classList.remove("modal-closing", "modal-show");
      }, { once: true });
    };
  });
  modalBg.classList.remove("modal-bg-show");
  pageBody.classList.remove("scroll-block");
  modalInput.forEach(n => n.classList.remove("input-error"));
};

/* скрипты слайдеров */
const allSlides = document.querySelectorAll(".slide");
const arrowPrev = document.querySelector(".slide-arrow-previous");
const arrowNext = document.querySelector(".slide-arrow-next");
const toggles = document.querySelectorAll(".slide-toggle");

toggleDisable();
/* переключение стрелками */
arrowNext.addEventListener("click", function (evt) {
  evt.preventDefault();
  nextSlide();
  toggleDisable();
});

arrowPrev.addEventListener("click", function (evt) {
  evt.preventDefault();
  prevSlide();
  toggleDisable();
});

/* переключение кнопкой */
for (i = 0; i < toggles.length; i++) {
  let toggle = toggles[i];
  let slide = allSlides[i];
  toggle.addEventListener("click", function (evt) {
    toggles.forEach(n => n.removeAttribute("disabled", "disabled"));
    toggle.setAttribute("disabled", "disabled");
    allSlides.forEach(n => n.classList.remove("slide-shown"));
    slide.classList.add("slide-shown");
  });
};

/* деактивация кнопки */
function toggleDisable() {
  for (i = 0; i < allSlides.length; i++) {
    if (allSlides[i].classList.contains("slide-shown")) {
      toggles.forEach(n => n.removeAttribute("disabled", "disabled"));
      toggles[i].setAttribute("disabled", "disabled");
    };
  };
};
/* следующий слайд */
function nextSlide() {
  for (i = 0; i < allSlides.length; i++) {
    if (allSlides[i].classList.contains("slide-shown")) {
      allSlides[i].classList.remove("slide-shown");
      if (!allSlides[i + 1]) {
        allSlides[0].classList.add("slide-shown");
      } else {
        allSlides[i + 1].classList.add("slide-shown");
      };
      break;
    };
  };
};
/* предыдущийслайд */
function prevSlide() {
  for (i = allSlides.length - 1; i >= 0; i--) {
    if (allSlides[i].classList.contains("slide-shown")) {
      allSlides[i].classList.remove("slide-shown");
      if (!allSlides[i - 1]) {
        allSlides[allSlides.length - 1].classList.add("slide-shown");
      } else {
        allSlides[i - 1].classList.add("slide-shown");
      };
      break;
    };
  };
};

/* Слайдер в блоке сервисы */
const services = document.querySelectorAll(".service-name");
const descriptions = document.querySelectorAll(".service-desc");
const servicesNames = document.querySelector(".services-names");
const servicesDescs = document.querySelector(".services-descs");

servicesNames.classList.remove("services-names-hide");
servicesDescs.classList.remove("services-descs-wide");
descriptions.forEach(elem => {
  if (elem != descriptions[0]) {
    elem.classList.remove("service-desc-show");
  };
});

services.forEach(n => n.addEventListener("click", serviceToggle));

function serviceToggle() {
  services.forEach(elem => {
    if (!this.elem) {
      elem.classList.remove("service-name-active");
    }
    !this.classList.add("service-name-active");
  });
  for (i = 0; i < services.length; i++) {
    if (services[i].classList.contains('service-name-active')) {
      descriptions.forEach(n => n.classList.remove("service-desc-show"));
      descriptions[i].classList.add("service-desc-show");
    }
  }
};



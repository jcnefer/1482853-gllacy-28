// Модалка - Напишите нам

var contactsLink = document.querySelector('.contacts__link');
var feedbackPopup = document.querySelector('.feedback');
var feedbackClose = feedbackPopup.querySelector('.modal__close');
var feedbackForm = feedbackPopup.querySelector('.feedback__form');
var feedbackName = feedbackPopup.querySelector('#name-field');
var feedbackEmail = feedbackPopup.querySelector('#email-field');
var feedbackLetter = feedbackPopup.querySelector('#letter-field');

// Проверяем поддержку localStorage браузером

var isStorageSupport = true;
var storage = '';

try {
	storage = localStorage.getItem('name');
} catch (err) {
	isStorageSupport = 'false';
}

// Кнопка открытия модального окна

contactsLink.addEventListener('click', function(event) {
	event.preventDefault();
	feedbackPopup.classList.add('modal-show');

	if (storage) {
		feedbackName.value = storage;
		feedbackEmail.value = localStorage.getItem('email');
		feedbackLetter.focus();
	} else {
		feedbackName.focus();
	}
});

// Кнопка закрытия модального окна

feedbackClose.addEventListener('click', function() {
	feedbackPopup.classList.remove('modal-show');
	feedbackPopup.classList.remove('modal-error');
});

// Валидация формы

feedbackForm.addEventListener('submit', function(event) {
	if (!feedbackName.value || !feedbackEmail.value || !feedbackLetter.value) {
		event.preventDefault();
		feedbackPopup.classList.remove('modal-error');
		feedbackPopup.offsetWidth = feedbackPopup.offsetWidth;
		feedbackPopup.classList.add('modal-error');
	} else {
		localStorage.setItem('name', feedbackName.value);
		localStorage.setItem('email', feedbackEmail.value);
	}
});

// Кнопка Esc для закрытия модального окна

window.addEventListener('keydown', function(event) {
	if (event.keyCode === 27) {
		if (feedbackPopup.classList.contains('modal-show')) {
			event.preventDefault();
			feedbackPopup.classList.remove('modal-show');
			feedbackPopup.classList.remove('modal-error');
		}
	}
});

// Промо Слайдеры

var pageMain = document.querySelector('.page');
var sliderControls = document.querySelectorAll('.slider__controls-btn');
var sliderItems = document.querySelectorAll('.slider__item');
var sliderControlsArr = Array.from(sliderControls);

function removeClassSliders() {
	sliderControls.forEach((btn) => {
		btn.classList.remove('slider__controls-btn--active');
	});

	sliderItems.forEach((btn) => {
		btn.classList.remove('slider__item--active');
	});
}

sliderControls.forEach((btn) => {
	btn.addEventListener('click', function() {
		removeClassSliders();
		this.classList.add('slider__controls-btn--active');
		sliderItems[sliderControlsArr.indexOf(this)].classList.add('slider__item--active');
		pageMain.dataset.index = sliderControlsArr.indexOf(this);
	});
});

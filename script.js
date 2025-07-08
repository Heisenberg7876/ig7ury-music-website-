let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

function showSlide(index) {
    if (index >= totalItems) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalItems - 1;
    } else {
        currentIndex = index;
    }
    document.querySelector('.carousel-container').style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

setInterval(() => {
    nextSlide();
}, 3000);
document.querySelector('a[href="login.html"]').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default action to demonstrate animation (optional)
    window.location.href = 'login.html'; // Redirect to the login page
});

document.querySelector('a[href="signup.html"]').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default action to demonstrate animation (optional)
    window.location.href = 'signup.html'; // Redirect to the signup page
});

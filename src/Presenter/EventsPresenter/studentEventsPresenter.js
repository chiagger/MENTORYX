// Mostra o nasconde il dropdown del profilo
document.getElementById("profile-icon").addEventListener("click", function () {
    const profileDropdown = document.getElementById("profile-dropdown");
    profileDropdown.style.display = (profileDropdown.style.display === "block") ? "none" : "block";
});

// Aggiunta effetti visivi dinamici e responsivi
window.addEventListener("mousemove", function (e) {
    const balls = document.querySelectorAll(".ball");
    const mouseX = e.pageX;
    const mouseY = e.pageY;

    balls.forEach(function (ball) {
        const ballX = ball.getBoundingClientRect().left + ball.clientWidth / 2;
        const ballY = ball.getBoundingClientRect().top + ball.clientHeight / 2;

        const diffX = mouseX - ballX;
        const diffY = mouseY - ballY;

        const distance = Math.sqrt(diffX * diffX + diffY * diffY);

        const maxDistance = Math.max(window.innerWidth, window.innerHeight) / 2;

        const scale = 1 - distance / maxDistance;

        ball.style.transform = `scale(${scale})`;
    });
});




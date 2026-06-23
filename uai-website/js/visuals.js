// Scroll reveal logic
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
reveal(); // Initial check

// 3D Tilt effect for cards
document.querySelectorAll('.tilt-element').forEach(item => {
    item.addEventListener('mousemove', e => {
        let el = item.getBoundingClientRect();
        let x = e.clientX - el.left;
        let y = e.clientY - el.top;
        let centerX = el.width / 2;
        let centerY = el.height / 2;
        let rotateX = (y - centerY) / 10;
        let rotateY = (centerX - x) / 10;

        item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    });
});

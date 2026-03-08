let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

window.onscroll = () => {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
};

// Circular Ring Animation
const professionBox = document.querySelector('.profession-box');
if (professionBox) {
    let rotation = 0;
    // Rotates the ring every 2.5s. With a 1s CSS transition, it waits for 1.5s between spins.
    setInterval(() => {
        rotation -= 90;
        professionBox.style.transform = `rotate(${rotation}deg)`;
    }, 2500);
}
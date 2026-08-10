// ======================================
// PORTFOLIO JAVASCRIPT
// ======================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Portfolio website loaded successfully.");

    // Mobile navigation menu
const menuToggle = document.querySelector(".menu-toggle");
const navLinksContainer = document.querySelector(".nav-links");

if (menuToggle && navLinksContainer) {

    menuToggle.addEventListener("click", function () {

        navLinksContainer.classList.toggle("active");

    });


    // Close menu after clicking a link
    const mobileNavLinks =
        navLinksContainer.querySelectorAll("a");

    mobileNavLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinksContainer.classList.remove("active");

        });

    });

}

    // Get all navigation links
    const navLinks = document.querySelectorAll(".nav-links a");

    // Add smooth navigation behavior
    navLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId.startsWith("#")) {

                const targetSection = document.querySelector(targetId);

                if (targetSection) {

                    event.preventDefault();

                    targetSection.scrollIntoView({
                        behavior: "smooth"
                    });

                }
            }

        });

    });


    // Update footer year automatically
    const footerText = document.querySelector("footer p");

    if (footerText) {

        const currentYear = new Date().getFullYear();

        footerText.innerHTML =
            `&copy; ${currentYear} Alaka Masroor Ahmad. All Rights Reserved.`;

    }

});
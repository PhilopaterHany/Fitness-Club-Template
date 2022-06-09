// Scroll To Top Button
const scrllBtn = document.getElementById("to-top");
scrllBtn.onclick = () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
};

// Input Placeholder Function
const nameInp = document.getElementById("userName");
const emailInp = document.getElementById("userEmail");
const nameHolder = document.getElementById("uName");
const emailHolder = document.getElementById("uEmail");
function inputControl(input, holder) {
    holder.onclick = () => input.focus();
    input.onfocus = () => {
        holder.classList.add("has-data");
    };
    input.onblur = () => {
        if (input.value === "") {
            holder.classList.remove("has-data");
        }
    };
}
inputControl(nameInp, nameHolder);
inputControl(emailInp, emailHolder);

// Counters
const elements = document.querySelectorAll(".scroll-counter");
document.addEventListener("DOMContentLoaded", () => {
    elements.forEach((item) => {
        item.counterAlreadyFired = false;
        item.counterSpeed = 40;
        item.counterTarget = +item.innerText;
        item.counterCount = 0;
        item.counterStep = item.counterTarget / item.counterSpeed;

        item.updateCounter = function () {
            item.counterCount = item.counterCount + item.counterStep;
            item.innerText = Math.ceil(item.counterCount);

            if (item.counterCount < item.counterTarget) {
                setTimeout(item.updateCounter, item.counterSpeed);
            } else {
                item.innerText = item.counterTarget;
            }
        };
    });

    // Function To Determine If An Element Is Visible Or Not
    function isElementVisible(el) {
        let scroll = window.scrollY || window.pageYOffset;
        let boundsTop = el.getBoundingClientRect().top + scroll;
        let viewport = {
            top: scroll,
            bottom: scroll + window.innerHeight,
        };
        let bounds = {
            top: boundsTop,
            bottom: boundsTop + el.clientHeight,
        };
        return (
            (bounds.bottom >= viewport.top &&
                bounds.bottom <= viewport.bottom) ||
            (bounds.top <= viewport.bottom && bounds.top >= viewport.top)
        );
    }

    // Funciton That Will Run On Scrolling
    function handleScroll() {
        elements.forEach(function (item, id) {
            if (true === item.counterAlreadyFired) return;
            if (!isElementVisible(item)) return;
            item.updateCounter();
            item.counterAlreadyFired = true;
        });
    }

    window.onscroll = () => {
        // Making Scroll To Top Button Visible
        window.scrollY >= 600
            ? (scrllBtn.style.right = "20px")
            : (scrllBtn.style.right = "-1000px");

        // Starting Counters
        handleScroll();
    };
});

// Putting Year at Footer
document.querySelector("footer .year").innerHTML = new Date().getFullYear();
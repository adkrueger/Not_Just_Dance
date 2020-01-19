let opened = false;

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    if(opened) {
        closeNav();
    }
    else {
        document.getElementById("mySidenav").style.width = "45%";
        document.getElementById("main").style.marginLeft = "45%";
        opened = true
    }
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    opened = false;
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}
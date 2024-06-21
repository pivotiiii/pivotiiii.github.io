fetch("/footer.html")
.then(res => res.text())
.then(text => {
    let oldelem = document.querySelector("script#replace_with_footer");
    let newelem = document.createElement("div");
    newelem.innerHTML = text;
    newelem.style.setProperty("position", "sticky");
    newelem.style.setProperty("top", "100vh");
    oldelem.parentNode.replaceChild(newelem,oldelem);
})
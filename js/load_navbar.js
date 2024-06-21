fetch("/navbar.html")
.then(res => res.text())
.then(text => {
    let oldelem = document.querySelector("script#replace_with_navbar");
    let newelem = document.createElement("div");
    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem, oldelem);
    
    let script = document.createElement("script");
    script.type = "module";
    script.src = "/js/populate_dropdown.js";
    script.defer = true;
    newelem.parentNode.appendChild(script);
})
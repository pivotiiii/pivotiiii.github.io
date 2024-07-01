const divs = document.querySelectorAll(".replace");
for (const div of divs) {
    const file = await fetch(div.dataset.file);
    const html = await file.text();
    div.innerHTML = html;

    if (div.dataset.style) {
        div.style.cssText = div.dataset.style;
    }

    if (div.dataset.script) {
        const script = document.createElement("script");
        script.type = "module";
        script.src = div.dataset.script;
        //script.defer = true;
        div.parentNode.appendChild(script);
    }
}

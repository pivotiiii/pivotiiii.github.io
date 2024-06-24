import {projects} from "/js/projects.js";
import {get_api_value} from "/js/common.js";

window.addEventListener('load', function() {populate_cards()});

async function populate_cards() {
    const cards = document.getElementById("cards");
    cards.innerHTML = "";

    for (let project of projects) {
        const card = document.createElement("article");

        const header = document.createElement("h4");
        header.innerHTML = project.name;

        const desc = document.createElement("p");
        desc.id = project.name;
        desc.ariaBusy = "true";
        const button = document.createElement("a");
        button.href = project.link;
        button.style = "text-decoration: none;"
        const button_div = document.createElement("div");
        button_div.role = "button";
        if (project.link.startsWith("http")) {
            let root_domain = project.link
                .match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)[1]
                .split('.').slice(-2).join('.');
                button_div.innerHTML = "View on " + root_domain + ' <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><g fill="none" fill-rule="evenodd"><path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8"/></g></svg>';
                button.target = "_blank";
        } else {
            button_div.innerHTML = "Open";
        }
        button.appendChild(button_div);
        
        card.appendChild(header);
        card.appendChild(desc);
        card.appendChild(button);
        cards.appendChild(card);
    }

    for (let project of projects) {
        const desc = document.getElementById(project.name);
        if (project.desc_external) {
            desc.innerHTML = await get_api_value(project.description, project.desc_external_key, 1800000);
        } else {
            desc.innerHTML = project.description;
        }
        desc.ariaBusy = "false";
    }

}
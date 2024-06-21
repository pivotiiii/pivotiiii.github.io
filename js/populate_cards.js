import {projects} from "/js/projects.js";
import {get_desc, waitForElementToDisplay} from "/js/common.js";

waitForElementToDisplay("#cards", function() {populate_cards();}, 100, 500);

async function populate_cards() {
    const cards = document.getElementById("cards");
    cards.innerHTML = "";

    for (let project of projects) {
        const card = document.createElement("article");

        const header = document.createElement("h4");
        header.innerHTML = project.name;

        const desc = document.createElement("p");
        if (project.desc_external) {
            desc.innerHTML = await get_desc(project.description, project.desc_external_key);
        } else {
            desc.innerHTML = project.description;
        }

        const button = document.createElement("a");
        button.href = project.link;
        button.style = "text-decoration: none;"
        const button_div = document.createElement("div");
        button_div.role = "button";
        if (project.is_external) {
            let root_domain = project.link
                .match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)[1]
                .split('.').slice(-2).join('.');
                button_div.innerHTML = "View on " + root_domain + "<i class='icon-link-ext' style='padding-left: 5px'></i> ";
        } else {
            button_div.innerHTML = "Open";
        }
        button.appendChild(button_div);
        
        card.appendChild(header);
        card.appendChild(desc);
        card.appendChild(button);
        cards.appendChild(card);
    }
    cards.style.removeProperty("display");

}
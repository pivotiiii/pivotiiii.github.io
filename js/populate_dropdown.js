import {projects} from "/js/projects.js";
import {waitForElementToDisplay} from "/js/common.js";

waitForElementToDisplay("#dropdown_list", function() {populate_dropdown();}, 100, 500);

async function populate_dropdown() { 
    const dd = document.getElementById("dropdown_list");
    dd.innerHTML = "";
    
    const li_all = document.createElement("li");
    const a_all = document.createElement("a");
    a_all.innerHTML = "View all";
    a_all.href = "index.html";
    li_all.appendChild(a_all);
    dd.appendChild(li_all);

    for (let project of projects) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.innerHTML = (project.is_external ? "<i class='icon-link-ext'></i> " : "") + project.shortname;
        a.href = project.link;
        a.target = (project.is_external ? "_blank" : "");
        li.appendChild(a);
        dd.appendChild(li);
    }
}
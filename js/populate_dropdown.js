import {projects} from "/js/projects.js";

window.onload = populate_dropdown();

async function populate_dropdown() { 
    const dd = document.getElementById("dropdown_list");
    dd.innerHTML = "";
    
    const li_all = document.createElement("li");
    const a_all = document.createElement("a");
    a_all.innerHTML = "View all";
    a_all.href = "/";
    li_all.appendChild(a_all);
    dd.appendChild(li_all);

    for (let project of projects) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.innerHTML = (project.is_external ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><g fill="none" fill-rule="evenodd"><path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8"/></g></svg> ' : "") + project.shortname;
        a.href = project.link;
        a.target = (project.is_external ? "_blank" : "");
        li.appendChild(a);
        dd.appendChild(li);
    }
}
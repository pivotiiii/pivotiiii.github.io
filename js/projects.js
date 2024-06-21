const projects = new Array(
    {
        name: "Simultaneous Equation Cannons - Calculator", 
        shortname: "SEC Calculator", 
        link: "indexSEC.html", 
        is_external: false, 
        description: "https://api.github.com/repos/pivotiiii/nsui_banner_fixer", 
        desc_external: true,
        desc_external_key: "description"
    },
    {
        name: "NSUI Banner Fixer", 
        shortname: "NSUI Banner Fixer", 
        link: "https://github.com/pivotiiii/nsui_banner_fixer", 
        is_external: true, 
        description: "https://api.github.com/repos/pivotiiii/nsui_banner_fixer", 
        desc_external: true,
        desc_external_key: "description"
    },
    {
        name: "Game Mover", 
        shortname: "Game Mover", 
        link: "https://github.com/pivotiiii/game_mover", 
        is_external: true, 
        description: "https://api.github.com/repos/pivotiiii/game_mover", 
        desc_external: true,
        desc_external_key: "description"
    },
    {
        name: "Wind Waker HD Playstation UI Mod", 
        shortname: "Wind Waker HD PS UI", 
        link: "https://gamebanana.com/mods/385841", 
        is_external: true, 
        description: "https://gamebanana.com/apiv11/Mod/385841/ProfilePage", 
        desc_external: true,
        desc_external_key: "_sDescription"
    },
);

//document.addEventListener('DOMContentLoaded', populate_dropdown(), false);
waitForElementToDisplay("#dropdown_list",function(){populate_dropdown();},100,500);
waitForElementToDisplay("#cards",function(){populate_cards();},100,500);


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

        //const button = document.createElement("input");
        //button.href = project.link;
        //button.type = "button";
        //button.style.setProperty("margin-left", "0");
        //button.style.setProperty("margin-right", "0");
        //if (project.is_external) {
        //    let root_domain = project.link
        //        .match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)[1]
        //        .split('.').slice(-2).join('.');
        //        button.value = "View on " + root_domain + "<i class='icon-link-ext'></i> ";
        //        button.setAttribute("value", "View on " + root_domain + "<i class='icon-link-ext'></i> ");
        //} else {
        //    button.value = "Open";
        //}
        const button = document.createElement("a");
        button.href = project.link;
        button.style = "text-decoration: none;"
        
        const button_div = document.createElement("div");
        //button_div. = project.link;
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

 async function get_desc(url, key) {
    let desc = "";
    await fetch(url)
        .then(function(response) {return response.json();})
        .then(function(json) {
            desc = json[key];
        });
    return desc;
 }

function waitForElementToDisplay(selector, callback, checkFrequencyInMs, timeoutInMs) {
    var startTimeInMs = Date.now();
    (function loopSearch() {
      if (document.querySelector(selector) != null) {
        callback();
        return;
      }
      else {
        setTimeout(function () {
          if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs)
            return;
          loopSearch();
        }, checkFrequencyInMs);
      }
    })();
  }
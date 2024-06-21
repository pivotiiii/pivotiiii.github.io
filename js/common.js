export async function get_desc(url, key) {
    let desc = "";
    await fetch(url)
        .then(function(response) {return response.json();})
        .then(function(json) {
            desc = json[key];
        });
    return desc;
}
export async function get_api_value(url, key, max_age) {
    let cached_response = localStorage.getItem(url);
    if (cached_response) {
        let cached_obj = JSON.parse(cached_response);
        if (parseInt(Date.now() - parseInt(cached_obj["date"])) < max_age) {
            let cached_json = cached_obj["json"];
            return cached_json[key];
        }
    }
    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(`Fetching ${url}`);
    const toBeCachedResponse = {json: responseJson, date: Date.now()};
    localStorage.setItem(url, JSON.stringify(toBeCachedResponse));
    return responseJson[key];
}

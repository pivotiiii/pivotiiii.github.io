export async function get_api_value(url, key) {
    let cached_response = localStorage.getItem(url);
    if (cached_response) {
        let cached_obj = JSON.parse(cached_response);
        if (parseInt(Date.now() - parseInt(cached_obj["date"])) < 480000) {
            let cached_json = cached_obj["json"];
            return cached_json[key];
        }
    }
    return await fetch(url)
            .then(function(response) {return response.json();})
            .then(function(response_json) {
                console.log(`Fetching ${url}`);
                let too_be_cached_response = {json: response_json, date: Date.now()};
                localStorage.setItem(url, JSON.stringify(too_be_cached_response));
                return response_json[key];
            });
}
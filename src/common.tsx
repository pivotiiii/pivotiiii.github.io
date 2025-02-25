import {useState, useEffect} from "react";

export async function get_api_value(url: string, key: string, max_age: number) {
    const cachedResponse = localStorage.getItem(url);
    if (cachedResponse) {
        const cachedObj: {json: any; date: number} = JSON.parse(cachedResponse);
        if (Date.now() - cachedObj["date"] < max_age) {
            let cachedJson = cachedObj["json"];
            return cachedJson[key];
        }
    }
    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(`Fetching ${url}`);
    const toBeCachedResponse = {json: responseJson, date: Date.now()};
    localStorage.setItem(url, JSON.stringify(toBeCachedResponse));
    return responseJson[key];
}

export function useWindowDimensions() {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const handleResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return {width: width, height: height};
}

import {useEffect} from "react";

export function NotFoundComponent() {
    useEffect(() => {
        const meta404 = document.createElement("meta");
        meta404.name = "prerender-status-code";
        meta404.content = "404";
        document.head.appendChild(meta404);
        return () => meta404.remove();
    }, []);
    return (
        <div
            style={{
                display: "flex",
                alignItems: "start",
                justifyContent: "center",
                // height: "100vh",
                marginTop: "3vh",
            }}
        >
            <h2>Page not found.</h2>
        </div>
    );
}

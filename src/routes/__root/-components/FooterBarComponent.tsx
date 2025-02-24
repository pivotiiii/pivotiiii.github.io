import * as React from "react";

export function FooterBarComponent() {
    return (
        <div style={{position: "sticky", top: "100vh"}}>
            <hr />
            <small style={{display: "block", textAlign: "center"}}>
                <small>
                    Built by pivotiiii © {new Date().getFullYear()} using{" "}
                    <a href="https://picocss.com" className="secondary">
                        Pico CSS
                    </a>
                </small>
            </small>
        </div>
    );
}

import {HeadContent, Outlet, createRootRoute, useLocation} from "@tanstack/react-router";
import {NavBarComponent} from "./__root/-components/NavBarComponent";
import {FooterBarComponent} from "./__root/-components/FooterBarComponent";
import {ParticlesComponent} from "./__root/-components/ParticlesComponent";
import {NotFoundComponent} from "./__root/-components/NotFoundComponent";
import * as React from "react";
import {useMatchMedia} from "../common";

export const Route = createRootRoute({
    component: RootComponent,
    head: () => ({
        meta: [{name: "author", content: "pivotiiii"}],
    }),
    notFoundComponent: NotFoundComponent,
});

const routeColors: {[key: string]: string} = {
    "/": "cyan",
    "/simultaneous_equation_cannon_calculator": "pink",
};

function RootComponent() {
    const currentLocation = useLocation();
    const currentColor: string = routeColors[currentLocation.pathname] || "cyan";

    const defaultTheme = (localStorage.getItem("theme") as "light" | "dark" | "system") || "system";
    const systemThemeIsDark = useMatchMedia("(prefers-color-scheme: dark)");
    const [theme, setTheme] = React.useState<"light" | "dark" | "system">(defaultTheme);

    React.useEffect(() => {
        let themeToUse = theme;
        localStorage.setItem("theme", themeToUse);
        if (themeToUse === "system") {
            themeToUse = systemThemeIsDark ? "dark" : "light";
        }
        document.documentElement.setAttribute("data-theme", themeToUse);
        return () => {};
    }, [theme, systemThemeIsDark]);

    return (
        <div style={{minHeight: "95vh"}} className={currentColor}>
            <HeadContent />
            <NavBarComponent color={currentColor} setTheme={setTheme} />
            <ParticlesComponent color={currentColor} />
            <Outlet />
            <FooterBarComponent />
        </div>
    );
}

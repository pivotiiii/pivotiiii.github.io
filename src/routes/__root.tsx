import {HeadContent, Outlet, createRootRoute, useLocation} from "@tanstack/react-router";
import {NavBarComponent} from "./__root/-components/NavBarComponent";
import {FooterBarComponent} from "./__root/-components/FooterBarComponent";
import {ParticlesComponent} from "./__root/-components/ParticlesComponent";
import {NotFoundComponent} from "./__root/-components/NotFoundComponent";

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
    return (
        <div style={{minHeight: "95vh"}} className={currentColor}>
            <HeadContent />
            <NavBarComponent color={currentColor} />
            <ParticlesComponent color={currentColor} />
            <Outlet />
            <FooterBarComponent />
        </div>
    );
}

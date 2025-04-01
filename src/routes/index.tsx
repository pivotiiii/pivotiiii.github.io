import {Await, createFileRoute, Link} from "@tanstack/react-router";
import {projects} from "../projects";
import {get_api_value} from "../common";
import og_image from "./__root/-assets/og_image_main.png?format=webp&imagetools";

const urlRoute = "/";
const title = "pivotiiii - Projects";
const description = "All projects and mods made by pivotiiii.";

export const Route = createFileRoute(urlRoute)({
    component: ProjectsComponent,
    head: () => ({
        title: title,
        meta: [
            {title: title},
            {name: "description", content: description},
            {property: "og:title", content: title},
            {property: "og:image", content: og_image},
            {property: "og:type", content: "website"},
            {property: "og:url", content: __URL__},
            {property: "og:site_name", content: "pivotiiii"},
            {property: "og:description", content: description},
            {name: "twitter:card", content: "summary_large_image"},
            {name: "twitter:title", content: title},
            {name: "twitter:description", content: description},
            {name: "twitter:image", content: og_image},
        ],
        links: [{rel: "canonical", href: __URL__}],
    }),
    loader: async () => {
        const descriptionObjects = fetchDescriptions();
        return descriptionObjects;
    },
    staleTime: Infinity,
    preloadStaleTime: Infinity,
    pendingMinMs: 0,
});

function fetchDescriptions() {
    const descObjs = projects.map((project) => {
        const description = get_api_value(
            project.description,
            project.desc_external_key,
            24 * 60 * 60 * 1000,
        );
        return {link: project.link, description: description};
    });
    return descObjs;
}

const externalIconCards = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 28 28"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <g fill="none" fillRule="evenodd">
            <path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8" />
        </g>
    </svg>
);

function ProjectCardButtonComponent(props: {url: string}) {
    if (props.url != null) {
        const matches = props.url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
        if (matches != null && matches.length > 1) {
            return (
                <a href={props.url} style={{textDecoration: "none"}} target="_blank">
                    <div role="button">
                        {"View on " + matches[1] + " "}
                        {externalIconCards}
                    </div>
                </a>
            );
        }
    }
    return (
        <Link to={props.url} style={{textDecoration: "none"}}>
            <div role="button">Open</div>
        </Link>
    );
}

function ProjectDescriptionComponent(props: ProjectProperties) {
    const descriptionPromise = Route.useLoaderData({
        select: (data) => data.find((descObj) => descObj["link"] === props.link),
    })?.description;
    if (descriptionPromise) {
        return (
            <Await promise={descriptionPromise} fallback={<p style={{height: "3em"}} aria-busy={true}></p>}>
                {(fetchedDescription) => {
                    return <p>{fetchedDescription}</p>;
                }}
            </Await>
        );
    }
    return <p></p>;
}

function ProjectCardComponent(props: ProjectProperties) {
    return (
        <article>
            <h4>{props.name}</h4>
            <ProjectDescriptionComponent {...props} />
            <ProjectCardButtonComponent url={props.link} />
        </article>
    );
}

function ProjectsComponent() {
    return (
        <>
            <div>
                <h1>Projects</h1>
                {projects.map((project) => (
                    <ProjectCardComponent key={project.name} {...project} />
                ))}
            </div>
        </>
    );
}

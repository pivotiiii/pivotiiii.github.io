import {Await, createFileRoute, Link} from "@tanstack/react-router";
import {projects} from "../projects";
import {get_api_value} from "../common";

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
            // {property: "og:image", content: title},
            {property: "og:type", content: "website"},
            {property: "og:url", content: __URL__ + urlRoute},
            {property: "og:site_name", content: "pivotiiii"},
            {property: "og:description", content: description},
            {name: "twitter:card", content: "summary"},
            {name: "twitter:title", content: title},
            {name: "twitter:description", content: description},
            // {name: "twitter:image", content: ""},
        ],
    }),
    loader: async () => {
        const descriptions = fetchDescriptions();
        return {loaderDescriptions: descriptions};
    },
    staleTime: Infinity,
    preloadStaleTime: Infinity,
    pendingMinMs: 0,
});

function fetchDescriptions() {
    const descObjs = Promise.allSettled(
        projects.map(async (project) => {
            const description = await get_api_value(
                project.description,
                project.desc_external_key,
                30 * 60 * 1000,
            );
            return {link: project.link, description: description};
        }),
    );
    return {descObjs: descObjs};
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

function CardButtonComponent(props: {url: string}) {
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

function DescriptionComponent(props: ProjectProperties) {
    const {loaderDescriptions} = Route.useLoaderData();
    return (
        <Await
            // prettier-ignore
            promise={loaderDescriptions.descObjs as Promise<PromiseFulfilledResult<{link: string; description: any;}>[]>}
            fallback={<p style={{height: "3em"}} aria-busy={true}></p>}
        >
            {(fetchedData) => {
                const a = fetchedData.find(
                    (data) => data.status === "fulfilled" && data.value.link === props.link,
                )?.value.description;
                return <p>{a}</p>;
            }}
        </Await>
    );
}

function CardComponent(props: ProjectProperties) {
    return (
        <article>
            <h4>{props.name}</h4>
            <DescriptionComponent {...props} />
            <CardButtonComponent url={props.link} />
        </article>
    );
}

function ProjectsComponent() {
    return (
        <>
            <div>
                <h1>Projects</h1>
                {projects.map((project) => (
                    <CardComponent key={project.name} {...project} />
                ))}
            </div>
        </>
    );
}

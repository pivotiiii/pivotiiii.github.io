import {Link} from "@tanstack/react-router";
import * as React from "react";
import {projects} from "../../../projects";
import icon from "../-assets/favicon.png";
import "./NavBarComponent.css";



function GithubIconComponent() {
    const ghIcon = (
        <svg className="gh-icon" width="30" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
            />
        </svg>
    );
    return ghIcon;
}

interface ProjectsDropdownElementComponentProps {
    link: string;
    shortname: string;
    stateChanger: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProjectsDropdownElementComponent(props: ProjectsDropdownElementComponentProps) {
    const external_icon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 32 32"
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

    if (props.link.startsWith("http")) {
        return (
            <li>
                <a href={props.link} target="_blank">
                    {external_icon} {props.shortname}
                </a>
            </li>
        );
    }
    return (
        <li>
            <Link to={props.link} onClick={() => props.stateChanger((prev) => !prev)}>
                {props.shortname}
            </Link>
        </li>
    );
}

function ProjectsDropdownComponent() {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleToggle = (event: {currentTarget: {open: boolean}}) => {
        setIsOpen(event.currentTarget.open);
    };

    return (
        <details className="dropdown" id="dropdown" onToggle={handleToggle} open={isOpen}>
            <summary>Projects</summary>
            <ul dir="rtl" id="dropdown_list">
                <ProjectsDropdownElementComponent
                    key="all"
                    link="/"
                    shortname="View all"
                    stateChanger={setIsOpen}
                />
                {projects.map((project) => (
                    <ProjectsDropdownElementComponent
                        key={project.name}
                        link={project.link}
                        shortname={project.shortname}
                        stateChanger={setIsOpen}
                    />
                ))}
            </ul>
        </details>
    );
}

export function NavBarComponent(props: {color: string}) {
    return (
        <div style={{minHeight: "5vh"}} className={props.color}>
            <nav>
                <ul>
                    <li>
                        <Link to="/" className="contrast">
                            <strong>pivotiiii</strong>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <img
                                src={icon}
                                alt="profile picture"
                                width="30"
                                style={{borderRadius: "50%"}}
                            />
                        </Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a href="https://github.com/pivotiiii">
                            <GithubIconComponent />
                        </a>
                    </li>
                    <li>
                        <ProjectsDropdownComponent />
                    </li>
                </ul>
            </nav>
            <hr />
        </div>
    );
}

import {Link} from "@tanstack/react-router";
import * as React from "react";
import {projects} from "../../../projects";
import icon from "../-assets/favicon.png";

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
                        <a href="https://github.com/pivotiiii">Github</a>
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

import {Link} from "@tanstack/react-router";
import * as React from "react";
import {projects} from "../../../projects";
import icon from "../-assets/favicon.png";
import "./NavBarComponent.css";

function LightDarkIconComponent(props: {
    setColorMode: React.Dispatch<React.SetStateAction<string>>;
}) {
    const toggleColorMode = () => {
        props.setColorMode((prev) => {
            const newColorMode = prev === "dark" ? "light" : "dark";
            localStorage.setItem("colorMode", newColorMode);
            return newColorMode;
        });
    };

    const lightIcon = (
        <svg
            className="color-mode-icon light-mode-icon"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="32"
            height="32"
            viewBox="0,0,256,256"
        >
            <g
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
                style={{mixBlendMode: "normal"}}
            >
                <g transform="scale(3.55556,3.55556)">
                    <path d="M36,23c7.18,0 13,5.82 13,13c0,7.18 -5.82,13 -13,13c-7.18,0 -13,-5.82 -13,-13c0,-7.18 5.82,-13 13,-13zM40,11c0,0.732 0,3.268 0,4c0,2.209 -1.791,4 -4,4c-2.209,0 -4,-1.791 -4,-4c0,-0.732 0,-3.268 0,-4c0,-2.209 1.791,-4 4,-4c2.209,0 4,1.791 4,4zM56.506,21.151c-0.518,0.518 -2.311,2.311 -2.828,2.828c-1.562,1.562 -4.095,1.562 -5.657,0c-1.562,-1.562 -1.562,-4.095 0,-5.657c0.518,-0.518 2.311,-2.311 2.828,-2.828c1.562,-1.562 4.095,-1.562 5.657,0c1.562,1.562 1.562,4.095 0,5.657zM61,40c-0.732,0 -3.268,0 -4,0c-2.209,0 -4,-1.791 -4,-4c0,-2.209 1.791,-4 4,-4c0.732,0 3.268,0 4,0c2.209,0 4,1.791 4,4c0,2.209 -1.791,4 -4,4zM50.849,56.506c-0.518,-0.518 -2.311,-2.311 -2.828,-2.828c-1.562,-1.562 -1.562,-4.095 0,-5.657c1.562,-1.562 4.095,-1.562 5.657,0c0.518,0.518 2.311,2.311 2.828,2.828c1.562,1.562 1.562,4.095 0,5.657c-1.562,1.562 -4.095,1.562 -5.657,0zM32,61c0,-0.732 0,-3.268 0,-4c0,-2.209 1.791,-4 4,-4c2.209,0 4,1.791 4,4c0,0.732 0,3.268 0,4c0,2.209 -1.791,4 -4,4c-2.209,0 -4,-1.791 -4,-4zM15.494,50.849c0.518,-0.518 2.311,-2.311 2.828,-2.828c1.562,-1.562 4.095,-1.562 5.657,0c1.562,1.562 1.562,4.095 0,5.657c-0.518,0.518 -2.311,2.311 -2.828,2.828c-1.562,1.562 -4.095,1.562 -5.657,0c-1.562,-1.562 -1.562,-4.095 0,-5.657zM11,32c0.732,0 3.268,0 4,0c2.209,0 4,1.791 4,4c0,2.209 -1.791,4 -4,4c-0.732,0 -3.268,0 -4,0c-2.209,0 -4,-1.791 -4,-4c0,-2.209 1.791,-4 4,-4zM21.151,15.494c0.518,0.518 2.311,2.311 2.828,2.828c1.562,1.562 1.562,4.095 0,5.657c-1.562,1.562 -4.095,1.562 -5.657,0c-0.518,-0.518 -2.311,-2.311 -2.828,-2.828c-1.562,-1.562 -1.562,-4.095 0,-5.657c1.562,-1.562 4.095,-1.562 5.657,0z"></path>
                </g>
            </g>
        </svg>
    );

    const darkIcon = (
        <svg
            className="color-mode-icon dark-mode-icon"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="28"
            height="28"
            viewBox="0 0 50 50"
        >
            <path d="M 35.476562 2.9785156 A 1.50015 1.50015 0 0 0 34 4.5 L 34 6 L 32.5 6 A 1.50015 1.50015 0 1 0 32.5 9 L 34 9 L 34 10.5 A 1.50015 1.50015 0 1 0 37 10.5 L 37 9 L 38.5 9 A 1.50015 1.50015 0 1 0 38.5 6 L 37 6 L 37 4.5 A 1.50015 1.50015 0 0 0 35.476562 2.9785156 z M 22.5 6 C 11.748 6 3 14.748 3 25.5 C 3 36.252 11.748 45 22.5 45 C 29.5 45 35.997984 41.197125 39.458984 35.078125 C 39.704984 34.643125 39.717188 34.113016 39.492188 33.666016 C 39.267188 33.219016 38.834891 32.913562 38.337891 32.851562 C 29.594891 31.771562 23 24.313 23 15.5 C 23 12.967 23.547906 10.500922 24.628906 8.1699219 C 24.838906 7.7149219 24.807875 7.1858125 24.546875 6.7578125 C 24.285875 6.3308125 23.828125 6.0620156 23.328125 6.0410156 L 23.076172 6.0253906 C 22.885172 6.0123906 22.694 6 22.5 6 z M 40.476562 15.978516 A 1.50015 1.50015 0 0 0 39 17.5 L 39 19 L 37.5 19 A 1.50015 1.50015 0 1 0 37.5 22 L 39 22 L 39 23.5 A 1.50015 1.50015 0 1 0 42 23.5 L 42 22 L 43.5 22 A 1.50015 1.50015 0 1 0 43.5 19 L 42 19 L 42 17.5 A 1.50015 1.50015 0 0 0 40.476562 15.978516 z"></path>
        </svg>
    );
    return (
        <div onClick={toggleColorMode}>
            {lightIcon}
            {darkIcon}
        </div>
    );
}

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
        <details className="dropdown" onToggle={handleToggle} open={isOpen}>
            <summary>Projects</summary>
            <ul dir="rtl">
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

export function NavBarComponent(props: {
    color: string;
    setColorMode: React.Dispatch<React.SetStateAction<string>>;
}) {
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
                                height="30"
                                style={{borderRadius: "50%"}}
                            />
                        </Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <LightDarkIconComponent setColorMode={props.setColorMode} />
                    </li>
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

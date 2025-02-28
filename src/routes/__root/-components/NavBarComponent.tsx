import {Link} from "@tanstack/react-router";
import * as React from "react";
import {projects} from "../../../projects";
import icon from "../-assets/user.png?w=90&format=webp&imagetools";
import "./NavBarComponent.css";

declare global {
    type Theme = "dark" | "light" | "system";
}

const lightIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 256 256"
        className="color-mode-icon light-mode-icon"
    >
        <path
            d="M36 23c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13m4-12v4a4 4 0 0 1-8 0v-4a4 4 0 0 1 8 0m16.506 10.151-2.828 2.828a4 4 0 0 1-5.657-5.657l2.828-2.828a4 4 0 0 1 5.657 5.657M61 40h-4a4 4 0 0 1 0-8h4a4 4 0 0 1 0 8M50.849 56.506l-2.828-2.828a4 4 0 0 1 5.657-5.657l2.828 2.828a4 4 0 0 1-5.657 5.657M32 61v-4a4 4 0 0 1 8 0v4a4 4 0 0 1-8 0M15.494 50.849l2.828-2.828a4 4 0 0 1 5.657 5.657l-2.828 2.828a4 4 0 0 1-5.657-5.657M11 32h4a4 4 0 0 1 0 8h-4a4 4 0 0 1 0-8m10.151-16.506 2.828 2.828a4 4 0 0 1-5.657 5.657l-2.828-2.828a4 4 0 0 1 5.657-5.657"
            transform="scale(3.55556)"
        />
    </svg>
);

const darkIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="-8 0 60 50"
        className="color-mode-icon dark-mode-icon"
    >
        <path d="M35.477 2.979A1.5 1.5 0 0 0 34 4.5V6h-1.5a1.5 1.5 0 1 0 0 3H34v1.5a1.5 1.5 0 1 0 3 0V9h1.5a1.5 1.5 0 1 0 0-3H37V4.5a1.5 1.5 0 0 0-1.523-1.521M22.5 6C11.748 6 3 14.748 3 25.5S11.748 45 22.5 45c7 0 13.498-3.803 16.959-9.922a1.5 1.5 0 0 0-1.121-2.226C29.595 31.772 23 24.313 23 15.5c0-2.533.548-5 1.629-7.33a1.502 1.502 0 0 0-1.3-2.129l-.253-.016A9 9 0 0 0 22.5 6m17.977 9.979A1.5 1.5 0 0 0 39 17.5V19h-1.5a1.5 1.5 0 1 0 0 3H39v1.5a1.5 1.5 0 1 0 3 0V22h1.5a1.5 1.5 0 1 0 0-3H42v-1.5a1.5 1.5 0 0 0-1.523-1.521" />
    </svg>
);

const systemIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="-5 -7 62 62"
        className="color-mode-icon"
    >
        <path d="M47 22v2.5c0 .911-.539 1.736-1.374 2.101l-4.2 1.838a17.9 17.9 0 0 1-1.965 4.745l2.217 5.666-1.768 1.768a2.3 2.3 0 0 1-2.458.514l-4.268-1.67a17.9 17.9 0 0 1-4.746 1.965L26 47h-2.5a2.29 2.29 0 0 1-2.101-1.374l-1.838-4.2a17.9 17.9 0 0 1-4.745-1.965L9.15 41.678 7.383 39.91a2.3 2.3 0 0 1-.514-2.458l1.67-4.268a17.9 17.9 0 0 1-1.965-4.746L1 26v-2.5c0-.911.539-1.736 1.374-2.101l4.2-1.838a17.9 17.9 0 0 1 1.965-4.745L6.322 9.151 8.09 7.383a2.29 2.29 0 0 1 2.457-.514l4.268 1.67a17.9 17.9 0 0 1 4.746-1.965L22 1h2.5c.911 0 1.736.539 2.101 1.374l1.838 4.2a17.9 17.9 0 0 1 4.745 1.965l5.666-2.217 1.768 1.768c.644.644.846 1.609.514 2.457l-1.67 4.268a17.9 17.9 0 0 1 1.965 4.746zm-23-8c-5.523 0-10 4.478-10 10s4.478 10 10 10 10-4.478 10-10-4.478-10-10-10" />
    </svg>
);

interface ThemeDropdownComponentProps {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

function ThemeDropdownComponent(props: ThemeDropdownComponentProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleToggle = (event: {currentTarget: {open: boolean}}) => {
        setIsOpen(event.currentTarget.open);
    };
    const handleSelect = (theme: Theme) => {
        setIsOpen(false);
        props.setTheme(theme);
    };

    return (
        <details className="dropdown theme-dropdown" onToggle={handleToggle} open={isOpen}>
            <summary>
                {lightIcon}
                {darkIcon}
            </summary>
            <ul dir="ltr">
                <li>
                    <a
                        onClick={() => handleSelect("light")}
                        className="always-display cursor-pointer"
                        aria-current={props.theme === "light"}
                    >
                        {lightIcon} Light
                    </a>
                </li>
                <li>
                    <a
                        onClick={() => handleSelect("dark")}
                        className="always-display cursor-pointer"
                        aria-current={props.theme === "dark"}
                    >
                        {darkIcon} Dark
                    </a>
                </li>
                <li>
                    <a
                        onClick={() => handleSelect("system")}
                        className="cursor-pointer"
                        aria-current={props.theme === "system"}
                    >
                        {systemIcon} Device
                    </a>
                </li>
            </ul>
        </details>
    );
}

function LightDarkIconComponent(props: {setTheme: React.Dispatch<React.SetStateAction<Theme>>}) {
    const toggleTheme = () => {
        props.setTheme((prev) => {
            const newTheme = prev === "dark" ? "light" : "dark";
            localStorage.setItem("theme", newTheme);
            return newTheme;
        });
    };

    return (
        <div onClick={toggleTheme}>
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

interface NavBarComponentProps {
    color: string;
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

export function NavBarComponent(props: NavBarComponentProps) {
    return (
        <div style={{minHeight: "5vh"}} className={props.color}>
            <nav>
                <ul className="home-link">
                    <li>
                        <Link to="/" className="contrast">
                            <strong>pivotiiii</strong>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <img
                                src={icon}
                                className="user-icon"
                                alt="The Github profile picture of pivotiiii."
                                width="30"
                                height="30"
                                style={{borderRadius: "50%"}}
                            />
                        </Link>
                    </li>
                </ul>
                <ul>
                    {/* <li>
                        <LightDarkIconComponent setTheme={props.setTheme} />
                    </li> */}
                    <li>
                        <ThemeDropdownComponent theme={props.theme} setTheme={props.setTheme} />
                    </li>
                    <li>
                        <a href="https://github.com/pivotiiii" title="pivotiiii on Github">
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

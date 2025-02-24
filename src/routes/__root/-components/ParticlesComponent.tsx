import "./ParticlesComponent.css";

export function ParticlesComponent(props: {color: string}) {
    return (
        <div id="particlesContainer" className={"particlesContainer " + props.color}>
            {Array.from(Array(30), (_, idx) => (
                <div key={"particle" + idx} className="particle"></div>
            ))}
        </div>
    );
}

import { useRef } from "react";
import "./Projects.css";
import { ProjectsContent } from "./ProjectsContent.jsx";

function BigProject(props) {
  const bpRef = useRef();

  function onMouseEnter() {
    bpRef.current.className = "bp hover";
  }

  function onMouseLeave() {
    bpRef.current.className = "bp";
  }

  return (
    <div
      className="bp"
      ref={bpRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="text">
        {/* This should be a Link element but MainPage errors when trying to use 
            getClientBoundingRect on Link Elements */}
        <a href={`https://projects.baetylboy.biz/${props.href}`}>
          {props.title}
        </a>
        <p>{props.desc}</p>
      </div>
      <div className="backer" />
    </div>
  );
}

export function Projects() {
  return (
    <>
      <div id="projectsBg">
        <div id="projects" className="layer1">
          <h1>Projects</h1>
          {ProjectsContent.paragraph1}
          <div id="bp">
            <BigProject {...ProjectsContent.bigproject1} />
            <p>&</p>
            <BigProject {...ProjectsContent.bigproject2} />
          </div>
        </div>
      </div>
      <div id="accent2" className="layer2" />
    </>
  );
}

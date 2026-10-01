import { ArrowRight, Braces } from "lucide-react";
import { projectVisuals } from "@/lib/project-explorer";

export default function ProjectBlueprint({ slug }: { slug: string }) {
  const visual = projectVisuals[slug];
  return (
    <div className="project-blueprint">
      <div className="blueprint-heading">
        <span className="mono">// COMO FUNCIONA</span>
        <Braces size={27} />
      </div>
      <strong>{visual.title}</strong>
      <div className="blueprint-flow">
        {visual.steps.map((step, i) => (
          <div className="blueprint-step" key={step}>
            <span className="blueprint-node mono">0{i + 1}</span>
            <b>{step}</b>
            <span>{visual.technologies[i]}</span>
            {i < 2 && <ArrowRight className="blueprint-arrow" size={16} />}
          </div>
        ))}
      </div>
      <p>{visual.note}</p>
    </div>
  );
}

import ProjectGallery from "./ProjectGallery";

export default function ProjectsGrid() {
  return (
    <section id="projects" className="section-gap container-site relative z-10 text-[var(--text)]">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-3">Featured Projects</h2>
        <p className="text-[var(--muted)] max-w-xl mx-auto text-base md:text-lg">
          <b>A hand-picked set of projects showcasing my skills.</b>
        </p>
      </div>

      {/* Render the external gallery */}
      <ProjectGallery />
    </section>
  );
}
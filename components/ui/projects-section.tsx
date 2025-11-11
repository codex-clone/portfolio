
"use client";

import React from "react";
import { featuredProjects, projects } from "@/lib/projects-data";
import { ProjectCard } from "./project-card";

export function ProjectsSection() {
  return (
    <>
      <style jsx>{`
        .section {
          padding: 3rem 1rem;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.25rem;
        }
        .card {
          background: #111;
          color: #eee;
          border: 1px solid #2a2a2a;
          border-radius: 14px;
          padding: 1rem 1.125rem;
        }
        .card h3 {
          margin: 0 0 0.5rem;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .card p {
          margin: 0.25rem 0;
          line-height: 1.45;
        }
      `}</style>
      <section id="projects" className="section">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center text-gray-900 font-mono">Featured Projects</h2>
          <div className="grid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.repo} project={project} />
            ))}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold my-8 sm:my-12 text-center text-gray-900 font-mono">More Projects</h2>
          <div className="grid">
            {projects.map((project) => (
              <ProjectCard key={project.repo} project={project} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

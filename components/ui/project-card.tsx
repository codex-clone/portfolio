
import React from "react";
import type { Project } from "@/lib/projects-data";
import Link from "next/link";
import Image from "next/image";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card">
      <h3 className="project-title">
        {project.title}
        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} GitHub`}>
          <Image
            src={project.starsBadgeUrl}
            alt={`GitHub stars for ${project.title}`}
            width={100}
            height={20}
            unoptimized
          />
        </a>
      </h3>
      <p>{project.description}</p>
      <p>
        <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
          Repository
        </Link>
        {project.links?.map((link) => (
          <React.Fragment key={link.href}>
            {' · '}
            <Link href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </Link>
          </React.Fragment>
        ))}
      </p>
    </article>
  );
}

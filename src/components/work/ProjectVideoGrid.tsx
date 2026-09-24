import { Column, Grid, Heading, Text } from "@once-ui-system/core";

interface ProjectVideoGridProps {
  projects: {
    slug: string;
    title: string;
    summary: string;
    video: string;
  }[];
}

export function ProjectVideoGrid({ projects }: ProjectVideoGridProps) {
  if (projects.length === 0) return null;

  return (
    <Grid columns="2" s={{ columns: 1 }} fillWidth gap="40">
      {projects.map((project) => (
        <Column key={project.slug} fillWidth gap="20">
          <div
            style={{
              borderRadius: "var(--radius-l)",
              overflow: "hidden",
              width: "100%",
              height: "clamp(22rem, 55vh, 38rem)",
              background: "transparent",
            }}
          >
            <video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                border: "none",
                outline: "none",
              }}
            />
          </div>
          <Column fillWidth gap="8">
            <Heading as="h2" wrap="balance" variant="heading-strong-xl">
              {project.title}
            </Heading>
            <Text wrap="balance" variant="body-default-m" onBackground="neutral-weak">
              {project.summary}
            </Text>
          </Column>
        </Column>
      ))}
    </Grid>
  );
}

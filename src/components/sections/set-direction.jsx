"use client";

import { Features } from "../features";
import {
  AutomatedBacklogIcon,
  CustomViewsIcon,
  DiscussionIcon,
  IssuesIcon,
  ParentSubIcon,
  WorkflowsIcon,
} from "../icons/features";

export const SetDirection = () => {
  return (
    <Features color="0,225,244" colorDark="31,49,64">
      <Features.Main
        title={
          <>
            About
            <br />
            Us
          </>
        }
        // image="/team.webp"
        imageSize="large"
        text="Plan visually, collaborate in cross-team projects, and make better decisions with progress insights and project updates."
      />
      <Features.Grid
        features={[
          {
            icon: ParentSubIcon,
            title: "Multi-team projects.",
            text: "Collaborate across teams and departments.",
          },
          {
            icon: AutomatedBacklogIcon,
            title: "Project documents.",
            text: "Write project briefs and specs directly in Linear.",
          },
          {
            icon: WorkflowsIcon,
            title: "Custom roadmaps.",
            text: "Organize projects across multiple roadmaps.",
          },
          {
            icon: CustomViewsIcon,
            title: "Timeline view.",
            text: "Visualize the product journey ahead.",
          },
          {
            icon: DiscussionIcon,
            title: "Project insights.",
            text: "Track scope, velocity, and progress over time.",
          },
          {
            icon: IssuesIcon,
            title: "Personal notifications.",
            text: "Stay in the loop on project activity and updates.",
          },
        ]}
      />
      <Features.Cards
        features={[
          {
            image: "/card-updates.webp",
            imageClassName: "top-[55%] md:top-[40%] w-full left-[7%]",
            title: "Text To Image",
            text: "Turn words into captivating images with ease - Your message, our creativity!",
          },
          {
            // image: "/card-roadmaps.webp",
            imageClassName: "top-[55%] md:top-[40%] w-full left-[2%]",
            title: "Text To Text",
            text: "Connect with anyone, anywhere - effortlessly.",
          },
        ]}
      />
    </Features>
  );
};

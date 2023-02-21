import { Container } from "@/components/container";
import { HomepageHero } from "@/components/sections/homepage-hero";
import { SetDirection } from "@/components/sections/set-direction";
import "src/app/globals.css";
export default function Homepage() {
  return (
    <>
      <div className="overflow-hidden pb-[16.4rem] md:pb-[25.6rem]">
        <Container className="pt-[6.4rem]">
          <HomepageHero />
        </Container>
      </div>

      <SetDirection />
    </>
  );
}

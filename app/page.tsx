import HeroComponent from "@/components/front-side/hero-component";
import OurStoryComponent from "@/components/front-side/our-story-component";
import OurServicesComponent from "@/components/front-side/our-services-component";
import ProjectsComponent from "@/components/front-side/projects-component";
import PartnersComponent from "@/components/front-side/partners-component";
import SitesDevelopedComponent from "@/components/front-side/sites-developed-component";
import ImpactMapComponent from "@/components/front-side/impact-map-component";
import ReviewsComponent from "@/components/front-side/reviews-component";
import FooterComponent from "@/components/front-side/footer-component";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col items-center">
        <HeroComponent />
        <section id="story" className="w-full">
          <OurStoryComponent />
        </section>
        <section id="services" className="w-full">
          <OurServicesComponent />
        </section>
        <section id="projects" className="w-full">
          <ProjectsComponent />
        </section>
        <PartnersComponent />
        <section id="sites" className="w-full">
          <SitesDevelopedComponent />
        </section>
        <ImpactMapComponent />
        <section id="benefits" className="w-full">
          <ReviewsComponent />
        </section>
        <section id="contact" className="w-full">
          <FooterComponent />
        </section>
      </div>
    </main>
  );
}

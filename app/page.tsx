import HeroComponent from "@/components/front-side/hero-component";
import OurStoryComponent from "@/components/front-side/our-story-component";
import OurServicesComponent from "@/components/front-side/our-services-component";
import ProjectsComponent from "@/components/front-side/projects-component";
import PartnersComponent from "@/components/front-side/partners-component";
import SitesDevelopedComponent from "@/components/front-side/sites-developed-component";
import ReviewsComponent from "@/components/front-side/reviews-component";
import FooterComponent from "@/components/front-side/footer-component";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col items-center">
        <HeroComponent />
        <OurStoryComponent />
        <OurServicesComponent />
        <ProjectsComponent />
        <PartnersComponent />
        <SitesDevelopedComponent />
        <ReviewsComponent />
        <FooterComponent />
      </div>
    </main>
  );
}

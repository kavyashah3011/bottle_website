import { VideoScrollHero } from '../components/VideoScrollHero';
import { StorySection } from '../sections/StorySection';
import { PinnedBottleScroll } from '../sections/PinnedBottleScroll';
import { AmbitionSection } from '../sections/AmbitionSection';
import { PerformanceSection } from '../sections/PerformanceSection';
import { ProductShowcase } from '../sections/ProductShowcase';
import { FilmSection } from '../sections/FilmSection';

interface HomePageProps {
  onOpenFilmModal: () => void;
}

export function HomePage({ onOpenFilmModal }: HomePageProps) {
  return (
    <div>
      {/* 1. Scroll-Driven Video Hero with Frame Scrubbing */}
      <VideoScrollHero onOpenFilmModal={onOpenFilmModal} />

      {/* 2. Story Narrative 01 The Descent */}
      <StorySection />

      {/* 3. Pinned 3D Bottle Choreography */}
      <PinnedBottleScroll />

      {/* 4. Ambition 02 The Drive */}
      <AmbitionSection />

      {/* 5. Performance 03 Unbroken Momentum */}
      <PerformanceSection />

      {/* 6. Interactive 3D Product Showcase */}
      <ProductShowcase />

      {/* 7. Campaign Film Spotlight */}
      <FilmSection onOpenFilmModal={onOpenFilmModal} />
    </div>
  );
}

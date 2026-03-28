import HeroSection from "@/components/HeroSection";

import OverviewSection from "@/components/OverviewSection";
import BenchmarkSection from "@/components/BenchmarkSection";
import GallerySection from "@/components/GallerySection";
import HumanEvalSection from "@/components/HumanEvalSection";
import PipelineSection from "@/components/PipelineSection";
import ResultsSection from "@/components/ResultsSection";
import FooterSection from "@/components/FooterSection";
import BackgroundMusic from "@/components/BackgroundMusic";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <BackgroundMusic />
      <HeroSection />
      
      <OverviewSection />
      <PipelineSection />
      <ResultsSection />
      <BenchmarkSection />
      <GallerySection />
      <HumanEvalSection />
      <FooterSection />
    </div>
  );
};

export default Index;

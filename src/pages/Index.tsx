import HeroSection from "@/components/HeroSection";

import OverviewSection from "@/components/OverviewSection";
import BenchmarkSection from "@/components/BenchmarkSection";
import CrossModelComparison from "@/components/CrossModelComparison";

import PipelineSection from "@/components/PipelineSection";
import ResultsSection from "@/components/ResultsSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      <OverviewSection />
      <PipelineSection />
      <ResultsSection />
      <BenchmarkSection />
      
      <CrossModelComparison />
      
      <FooterSection />
    </div>
  );
};

export default Index;

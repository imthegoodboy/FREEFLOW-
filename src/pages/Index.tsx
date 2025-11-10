import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProblemSolution } from "@/components/ProblemSolution";
import { HowItWorks } from "@/components/HowItWorks";
import { SideShiftIntegration } from "@/components/SideShiftIntegration";
import { UseCases } from "@/components/UseCases";
import { Architecture } from "@/components/Architecture";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ProblemSolution />
      <HowItWorks />
      <SideShiftIntegration />
      <UseCases />
      <Architecture />
      <Footer />
    </div>
  );
};

export default Index;

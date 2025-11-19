import LandingNav from './LandingNav';
import Hero from './sections/Hero';
import Problem from './sections/Problem';
import HowItWorks from './sections/HowItWorks';
import ProductTour from './sections/ProductTour';
import MetricTicker from './sections/MetricTicker';
import Insights from './sections/Insights';
import Personas from './sections/Personas';
import DataFlex from './sections/DataFlex';
import FAQ from './sections/FAQ';
import FinalCTA from './sections/FinalCTA';
import GrowthLoop from './sections/GrowthLoop';

export default function LandingLayout() {
  return (
    <main className="min-h-screen w-full bg-[#0b1020] text-foreground">
      <LandingNav />
      <Hero />
      <Problem />
      <HowItWorks />
      <GrowthLoop />
      <ProductTour />
      <MetricTicker />
      <Insights />
      <Personas />
      <DataFlex />
      <FAQ />
      <FinalCTA />
    </main>
  );
}

import { ProjectHero } from "./components/ProjectHero";
import VisionMissionValues from "./components/VisionMissionValues";
import { InteractiveRoadmap } from "./components/InteractiveRoadmap";
import ProjectActivities from "./components/ProjectActivities";
import LocationsBeneficiaries from "./components/LocationsBeneficiaries";
import BudgetOverview from "./components/BudgetOverview";
import { ContactSection } from "./components/ContactSection";

export default function App() {
  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-green-50 text-gray-800">
      <ProjectHero />
      <VisionMissionValues />
      <InteractiveRoadmap />
      <ProjectActivities />
      <LocationsBeneficiaries />
      <BudgetOverview />
      <ContactSection />
    </div>
  );
}

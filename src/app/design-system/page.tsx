import ColoursSection from "./components/ColoursSection"
import InteractiveElements from "./components/interactive-elements"
import TypographySection from "./components/TypographySection"

const DesignSystem = () => (
  <div className="container flow">
    <h1>Design system</h1>
    <ColoursSection />
    <TypographySection />
    <InteractiveElements />
  </div>
)

export default DesignSystem

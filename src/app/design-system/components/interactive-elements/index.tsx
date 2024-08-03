import LargeButton from './LargeButton'
import NavBar from './NavBar'

const InteractiveElements = () => (
  <section className="flow" id="interactive-elements">
    <h2 className="numbered-title">
      <span>03</span> Interactive elements
    </h2>

    {/* navigation */}
    <div>
      <NavBar />
    </div>

    <div className="flex ">
      <div style={{ marginTop: '5rem' }}>
        {/* explore button */}
        <LargeButton />
      </div>

      <div style={{ marginBottom: '50vh' }}>
        {/* Tabs */}

        {/* Dots */}

        {/* Numbers */}
      </div>
    </div>
  </section>
)

export default InteractiveElements

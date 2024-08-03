import Dots from './Dots'
import LargeButton from './LargeButton'
import NavBar from './NavBar'
import Tabs from './Tabs'

const InteractiveElements = () => (
  <section className="flow" id="interactive-elements">
    <h2 className="numbered-title">
      <span>03</span> Interactive elements
    </h2>
    <div>
      <NavBar />
    </div>

    <div className="flex ">
      <div style={{ marginTop: '5rem' }}>
        <LargeButton />
      </div>

      <div
        className="flow"
        style={
          {
            marginBottom: '50vh',
            '--flow-space': '4rem',
          } as React.CSSProperties
        }
      >
        {/* Tabs */}
        <Tabs />

        {/* Dots */}
        <Dots />

        {/* Numbers */}
      </div>
    </div>
  </section>
)

export default InteractiveElements

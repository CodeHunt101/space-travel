const ColoursSection = () => (
  <section id="colors">
    <h2 className="numbered-title">
      <span>01</span> colors
    </h2>
    <div className="flex">
      <div style={{ flexGrow: 1 }}>
        <div
          className="bg-dark text-white"
          style={{ padding: '3rem 1rem 1rem', border: '1px solid white' }}
        >
          #0B0D17
        </div>
        <p>
          <span className="text-accent">RGB</span> 11, 13, 23
        </p>
        <p>
          <span className="text-accent">HSL</span> 230°, 35%, 7%
        </p>
      </div>
      <div style={{ flexGrow: 1 }}>
        <div
          className="bg-accent text-dark"
          style={{ padding: '3rem 1rem 1rem', border: '1px solid white' }}
        >
          #D0D6F9
        </div>
        <p>
          <span className="text-accent">RGB</span> 208, 214, 249
        </p>
        <p>
          <span className="text-accent">HSL</span> 231°, 77%, 90%
        </p>
      </div>
      <div style={{ flexGrow: 1 }}>
        <div
          className="bg-white text-dark"
          style={{ padding: '3rem 1rem 1rem', border: '1px solid white' }}
        >
          #FFFFFF
        </div>
        <p>
          <span className="text-accent">RGB</span> 255, 255, 255
        </p>
        <p>
          <span className="text-accent">HSL</span> 0°, 0%, 100%
        </p>
      </div>
    </div>
  </section>
);

export default ColoursSection;
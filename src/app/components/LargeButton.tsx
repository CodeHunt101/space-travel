import style from './LargeButton.module.scss'

const LargeButton = () => (
  <a
    href="/destination"
    className={`${style['large-button']} uppercase ff-serif text-dark bg-white`}
    role="button"
    aria-label="Explore more about space travel"
  >
    <div>Explore</div>
  </a>
)

export default LargeButton

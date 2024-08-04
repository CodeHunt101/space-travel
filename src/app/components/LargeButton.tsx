import style from './LargeButton.module.scss'

const LargeButton = () => (
  <a
    href="#"
    className={`${style['large-button']} uppercase ff-serif text-dark bg-white`}
  >
    <div>Explore</div>
  </a>
)

export default LargeButton

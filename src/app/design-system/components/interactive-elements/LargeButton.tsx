import style from './LargeButton.module.scss'

const LargeButton = () => (
  <a
    href="#"
    className={`${style['large-button']} uppercase ff-serif fs-600 text-dark bg-white`}
  >
    <div>Explore</div>
  </a>
)

export default LargeButton

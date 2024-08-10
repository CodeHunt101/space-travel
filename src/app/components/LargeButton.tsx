import style from './LargeButton.module.scss'
import { Path } from '../utils/types';
import Link from 'next/link';

const LargeButton = () => (
  <Link
    href={Path.DESTINATION}
    className={`${style['large-button']} uppercase ff-serif text-dark bg-white`}
    role="button"
    aria-label="Explore more about space travel"
  >
    <div>Explore</div>
  </Link>
)

export default LargeButton

import classNames from 'classnames'

const WrapperContainer: React.FC = ({ children }) => (
  <div className={classNames('container', 'p-2', 'mx-auto')}>{children}</div>
)
export default WrapperContainer

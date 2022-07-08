import { useHistory } from 'react-router-dom'

const Sider = () => {

  const history = useHistory()

  return (
    <div>
      Sider
      <button onClick={() => history.push('/main/page1')}>page1</button>
      <button onClick={() => history.push('/main/page2')}>page2</button>
    </div>
  )
}

export default Sider
import { Header } from '../../components'

export const Layout = ({ children }) => {

  // Layout - Header e children _app ( componentes render )

  return(
    <>
      <Header/>
      {children}
    </>
  )
}
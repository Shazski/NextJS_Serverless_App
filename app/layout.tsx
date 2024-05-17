import '@styles/global.css'
import { ReactNode } from 'react'
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import { SessionContext } from 'next-auth/react'


export const metaData = {
  title: "Promtopia",
  description: "Discover & share AI Promts"
}


const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang='en'>
      <body>
        <Provider session={SessionContext}>
          <div className='main'>
            <div className='gradient' />
          </div>
          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout
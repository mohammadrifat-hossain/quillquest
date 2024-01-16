import { Ubuntu } from 'next/font/google'
import './globals.css'
import ReduxProvider from '@/redux/Provider'
import { Toaster } from 'react-hot-toast'

const ubuntu = Ubuntu({ subsets: ['latin'] , weight:['300','400','500','700']})

export const metadata = {
  title: 'Quill Quest - The Content App',
  description: `Welcome to Qill Quest, where curiosity meets knowledge! Immerse yourself in a world of captivating articles, thought-provoking insights, and expert perspectives. Our blog covers a diverse range of topics, including technology, lifestyle, science, travel, and more. Discover engaging stories written by passionate contributors who share their expertise and experiences. Whether you're a tech enthusiast, a travel buff, or simply looking for inspiration, Quill Quest is your go-to destination for informative and entertaining content. Stay informed, stay inspired, and join our community of avid readers on a journey of discovery. Start exploring today!`,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>
        <ReduxProvider>
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              // Define default options
              className: '',
              duration: 5000,
              style: {
                background: '#363636',
                color: '#fff',
              },
    
              // Default options for specific types
              success: {
                duration: 3000,
                theme: {
                  primary: 'green',
                  secondary: 'black',
                },
              },
            }}
          />
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}

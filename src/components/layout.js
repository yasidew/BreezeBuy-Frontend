import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

function layout({ children }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default layout
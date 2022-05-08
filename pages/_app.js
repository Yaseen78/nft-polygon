import '../styles/globals.css'
import '../styles/navbar.css'
import Link from 'next/link'
import NavIcon from '../assets/collections.png'
import Image from 'next/image'

function Marketplace({ Component, pageProps }) {
  return (
    <div className='container'>
      <nav className='navbar' style={{
        fontFamily: 'Montserrat'
      }}>
        <div className='logo'>
        <Link href="/home"  >
            <a >
              Logo
            </a>
            </Link>
            </div>
        <div className='nav-links'>
          <Link href="/">
            <a className='nav-link'>
              Marketplace
            </a>
          </Link>

          <Link href="/creator-dashboard">
            <a className='nav-link'>
              Dashboard
            </a>
          </Link>
          

          <Link href="/create-item">
            <a className='nav-link'>
              Create NFT
            </a>
          </Link>

          <Link href="/my-assets">
            <a className='nav-link'>
              <Image src={NavIcon} alt='image'></Image>
            </a>
          </Link>
          
        </div>
      </nav>
      <Component {...pageProps} />
      <footer style={{
        // position: 'fixed',
        bottom: 0,
        width: '100vw'
      }}>
      <div
					style={{
						maxWidth: "1620px",
						height: "1px",
						background: "#686868",
						marginLeft: 150,
            marginRight: 150,
            marginTop: 190,
						marginBottom: "50px",
					}}
				></div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: 150,
            marginRight: 150,
						width: "100%",

        }}>
          <div style={{
            display: 'flex',
						maxWidth: "1620px",
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            {/* 3 column components */}

            {/* 1st */}
              <div style={{
                disply: 'flex',
                flexDirection: 'column'
              }} >

                <div
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: '#F4CF49',
                  textShadow: '0px 2.84746px 2.84746px rgba(0, 0, 0, 0.25)'
                }}
                > Logo </div>
                <div style={{
                  fontSize: 18,
                  fontWeight: 500,
                  color: '#AAAFB5',
                  maxWidth: 410,
                  marginTop: 14

                }}>
                  Picking the perfect UI font for your website or app has its challenges.
                </div>

              </div>

              {/* 2nd */}

              <div style={{
                disply: 'flex',
                flexDirection: 'column',
                fontSize: 23,
                  fontWeight: 500,
                  color: '#AAAFB5',
              }} >

          <div><Link href="/">
            <a >
              Marketplace
            </a>
          </Link></div>
          <br/>

          <div><Link href="/creator-dashboard">
            <a >
              Dashboard
            </a>
          </Link></div>
          <br/>

          <div>
          <Link href="/create-item">
            <a >
              Create NFT
            </a>
          </Link>
          </div>

              </div>

              {/* 3rd */}

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                fontSize: 22,
                fontWeight: 500,
                color: '#AAAFB5',
                textShadow: '0px 3.23164px 3.23164px rgba(0, 0, 0, 0.25)'
              }}>
                <div>
                  <Link href='/'>
                    <a> About </a>
                  </Link>
                </div>
                <br/>
                <div>
                  <Link href='/'>
                    <a> Terms and conditions</a>
                  </Link>
                </div>
              </div>

          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'center',
            marginRight: 150,
            opacity: '30%',
            marginTop: 50,
            marginBottom: 50
          }}>Copyright 2022 Logo all rights reserved</div>
        </div>

      </footer>
    </div>
  )
}

export default Marketplace
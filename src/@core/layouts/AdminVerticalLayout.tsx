// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Fab from '@mui/material/Fab'
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

// ** Icons Imports
import ArrowUp from 'mdi-material-ui/ArrowUp'

// ** Theme Config Import
import themeConfig from 'src/configs/themeConfig'

// ** Type Import
import { LayoutProps } from 'src/@core/layouts/types'

// ** Components
import ScrollToTop from 'src/@core/components/scroll-to-top'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import Link from 'next/link'
import { useRouter } from 'next/router'


const MainContentWrapper = styled(Box)<BoxProps>({
  // flexGrow: 1,
  // minWidth: 0,
  // display: 'flex',
  // minHeight: '100vh',
  // flexDirection: 'column'
})

const ContentWrapper = styled('main')(({ theme }) => ({
  // flexGrow: 1,
  // width: '100%',
  // padding: theme.spacing(6),
  // transition: 'padding .25s ease-in-out',
  // [theme.breakpoints.down('sm')]: {
  //   paddingLeft: theme.spacing(4),
  //   paddingRight: theme.spacing(4)
  // }
}))

const AdminVerticalLayout = (props: LayoutProps) => {
  // ** Props
  const { settings, children, scrollToTop } = props

  // ** Vars
  const { contentWidth } = settings
  const navWidth = themeConfig.navigationSize

  // ** States
  const [navVisible, setNavVisible] = useState<boolean>(false)

  // ** Toggle Functions
  const toggleNavVisibility = () => setNavVisible(!navVisible)

  const router = useRouter();

  const logout = () => {
    // sessionStorage.removeItem('Token')
    router.push('/super-admin/login')
  }

  return (
    <>
        {/* Navigation Menu */}

        <header className='admin-header superadmin-head'>
          <div className='menu-head'>
            <div className='container'>
              <nav className='navbar navbar-expand-lg'>
                <div className='container-fluid'>
                  <Link href='/super-admin/dashboard' passHref>
                    <a className='navbar-brand'>
                      <img src='../../images/admin.png' alt='Long Island Tub Refinishing Logo' />
                    </a>
                  </Link>

                  <div className='profile-button'>
                    <figure>
                      <img src='../../images/user-image.png' alt='' />
                    </figure>

                    <div className='dropdown'>
                      <div className='inner'>
                        <button
                          className='btn btn-secondary'
                          type='button'
                          aria-expanded='false'
                          onClick={logout}
                        >
                        Logout
                        </button>

                      </div>
                    </div>
                  </div>

                  <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarSupportedContent'
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                  >
                    <span className='navbar-toggler-icon'></span>
                  </button>

                  <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                    <ul className='navbar-nav'>
                      <li>
                        <Link href='/super-admin/coaches-list' passHref>
                          <a>Coaches</a>
                        </Link>
                      </li>
                      <li>
                        <Link href='/super-admin/client-list' passHref>
                          <a>Clients</a>
                        </Link>
                      </li>
                      <li>
                        <Link href='/super-admin/plans' passHref>
                          <a>Plans</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
            {/* <!--/ menu-head --> */}
          </div>
          {/* <!--/ container --> */}
        </header>
        <MainContentWrapper className='layout-content-wrapper'>


          <ContentWrapper className='layout-page-content' >
            {children}
          </ContentWrapper>

        </MainContentWrapper>
          {/* Footer Component */}
          {/* <Footer {...props} /> */}

          {/* Portal for React Datepicker */}
          <DatePickerWrapper sx={{ zIndex: 11 }}>
            <Box id='react-datepicker-portal'></Box>
          </DatePickerWrapper>


      {/* Scroll to top button */}
      {scrollToTop ? (
        scrollToTop(props)
      ) : (
        <ScrollToTop className='mui-fixed'>
          <Fab color='primary' size='small' aria-label='scroll back to top'>
            <ArrowUp />
          </Fab>
        </ScrollToTop>
      )}
    </>
  )
}

export default AdminVerticalLayout

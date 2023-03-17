// ** MUI Imports
// import Link from 'next/link'

// ** React Imports
import { useState, SyntheticEvent, Fragment, ReactNode } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { styled, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiMenu, { MenuProps } from '@mui/material/Menu'
import MuiAvatar, { AvatarProps } from '@mui/material/Avatar'
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import Typography, { TypographyProps } from '@mui/material/Typography'

// ** Icons Imports
import BellOutline from 'mdi-material-ui/BellOutline'

// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'

// ** Styled Menu component
const Menu = styled(MuiMenu)<MenuProps>(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0
  }
}))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`
}))

const styles = {
  maxHeight: 349,
  '& .MuiMenuItem-root:last-of-type': {
    border: 0
  }
}

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  ...styles
})

// ** Styled Avatar component
const Avatar = styled(MuiAvatar)<AvatarProps>({
  width: '2.375rem',
  height: '2.375rem',
  fontSize: '1.125rem'
})

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  flex: '1 1 100%',
  overflow: 'hidden',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: theme.spacing(0.75)
}))

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)<TypographyProps>({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})


const Calender = () => {
    // ** States
    const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)

    // ** Hook
    const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

    const handleDropdownOpen = (event: SyntheticEvent) => {
      setAnchorEl(event.currentTarget)
    }

    const handleDropdownClose = () => {
      setAnchorEl(null)
    }

    const ScrollWrapper = ({ children }: { children: ReactNode }) => {
      if (hidden) {
        return <Box sx={{ ...styles, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
      } else {
        return (
          <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
        )
      }
    }

  return (
    <section className='calendar'>
      <div className='container'>
        <div className='row'>
          <div className="upcoming-event">
            <div className="row">
              <div className="col-sm-8"></div>
              <div className="col-sm-4">
                <div className="cal-icon">
                  <i className="fa fa-calendar-o"></i>
                  <p>upcoming meeting reminder <span>10 minutes : Client name</span></p>
                  <div className="join">
                    <h5>Join</h5>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className='timesheet-carousel'>
            <div className='row'>
              <div className='col-sm-1'>
                <div className='left-arrow'>
                  <i className='fa fa-angle-left' aria-hidden='true'></i>
                </div>
              </div>
              <div className='col-sm-10'>
                <div className='center-arrow'>
                  <span className='active'>Nov 07 - Nov 13</span>
                  <span>|</span>
                  <span>Nov 14 - Nov 20</span>
                  <span>|</span>
                  <span>Nov 21 - Nov 27</span>
                  <span>|</span>
                  <span>Nov 28 - Dec 04</span>
                  <span>|</span>
                  <span>Dec 05 - Dec</span>
                </div>
              </div>
              <div className='col-sm-1'>
                <div className='right-arrow'>
                  <i className='fa fa-angle-right' aria-hidden='true'></i>
                </div>
              </div>
            </div>
          </div> {/* timesheet-carousel */}
          <div className='timesheet-buttons'>
            <div className='row'>
              <div className='col-sm-12'>
                <button className='btn btn-two'>sync calendars</button>
                <button className='btn btn-four'>set availability</button>

                  <Fragment>

                            <button className='btn btn-five' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>schedule session</button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >

      <div className="schedule-session">
        <div className="row">
          <div className="col-sm-12">
            <div className="schedule">
              <h2>
              <i className="fa fa-calendar-o"></i>
              schedule a session
              </h2>
              <div className="divider"></div>

            </div>
          </div>
        </div>
      </div>
        {/* <ScrollWrapper>

          <MenuItem onClick={handleDropdownClose}>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <Avatar alt='order' src='/images/avatars/3.png' />
              <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                <MenuItemTitle>Revised Order </MenuItemTitle>
                <MenuItemSubtitle variant='body2'>New order revised from john</MenuItemSubtitle>
              </Box>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                19 Mar
              </Typography>
            </Box>
          </MenuItem> */}

        {/* </ScrollWrapper> */}

      </Menu>
                        </Fragment>

                  <button className='btn btn-five'>schedule session</button>

              </div>
            </div>
          </div> {/* timesheet-buttons */}

          <div id="calendar-wrap">
              <div className="calendar">
              <div className="table-responsive">
                <table className="table table-calendar table-bordered">
                  <thead>
                    <tr>
                      <th></th>
                    <th>mon 07</th>
                    <th>tue 08</th>
                    <th>wed 09</th>
                    <th>thu 10</th>
                    <th>fri 11</th>
                    <th>sat 12</th>
                    <th>sun 13</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>09:00</th>
                      <td>
                        <div className="blue-event">
                          <p>client name <span>09:30 - 10:30 </span> </p>
                          <small>notes : <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit.</small>
                        </div>
                      </td>
                      <td></td>
                      <td>
                        <div className="green-event">
                          <p>personal event <span>09:00 - 10:00 </span></p>
                        </div>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <th>10:00</th>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <div className="blue-event">
                          <p>client name <span>10:15 - 11:15 </span> </p>
                          <small>notes : <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit.</small>
                        </div>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <th>11:00</th>
                      <td></td>
                      <td><div className="blue-event">
                          <p>client name <span>11:00 - 12:00 </span> </p>
                          <small>notes : <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit.</small>
                        </div></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                      <div className="green-event">
                          <p>personal event <span>11:00 - 12:00 </span></p>
                        </div>
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <th>12:00</th>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td><div className="blue-event">
                          <p>client name <span>12:15 - 01:15 </span> </p>
                          <small>notes : <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit.</small>
                        </div></td>
                    </tr>
                    <tr>
                      <th>01:00</th>
                      <td></td>
                      <td></td>
                      <td>
                        <div className="green-event">
                          <p>personal event <span>01:00 - 02:00 </span></p>
                        </div></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              </div>
          </div>

        </div> {/* // row */}
      </div> {/* container */}
    </section> // calendar section
  )
}

export default Calender

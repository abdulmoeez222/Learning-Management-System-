import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'

const Navbar = () => {
  const location = useLocation()
  const isCourseListPage = location.pathname.includes('/course-list')
  const { navigate, isEducator } = useContext(AppContext)

  return (
    <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>
      <img src={assets.logo} alt="logo" className="w-28 lg:w-32 cursor-pointer" onClick={() => navigate('/')} />
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          <button onClick={() => navigate('/educator')} className='text-gray-500'>
            {isEducator ? 'Educator Dashboard' : 'Become Educator'}
          </button>
          <Link to="/my-enrollments">My Enrollments</Link>
        </div>
        <Show when="signed-out">
          <div className="flex items-center gap-3">
            <SignInButton mode="modal">
              <button className="px-5 py-2 rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-100">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600">
                Create Account
              </button>
            </SignUpButton>
          </div>
        </Show>
        <Show when="signed-in">
          <UserButton afterSignOutUrl="/" />
        </Show>
      </div>
      {/* For Phone View */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <div className="flex flex-col gap-2">
          <button onClick={() => navigate('/educator')} className='text-gray-500 text-left'>
            {isEducator ? 'Educator Dashboard' : 'Become Educator'}
          </button>
          <Link to="/my-enrollments">My Enrollments</Link>
        </div>
        <Show when="signed-out">
          <div className="flex items-center gap-2">
            <SignInButton mode="modal">
              <button className="px-4 py-2 rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-100">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
                Create
              </button>
            </SignUpButton>
          </div>
        </Show>
        <Show when="signed-in">
          <UserButton afterSignOutUrl="/" />
        </Show>
      </div>
    </div>
  )
}

export default Navbar

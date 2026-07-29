import  Hero  from '../../components/students/hero'
import Companies from '../../components/students/Companies'
import CoursesSection from '../../components/students/CoursesSection'
import Testimonials from '../../components/students/Testimonials'
import CallToAction from '../../components/students/CallToAction'

const Home = () => {
  return (
    <div className ='flex flex-col items-center space-y-7 w-full'>
      <Hero/>
      <Companies/>
      <CoursesSection/>
      <Testimonials/>
      <CallToAction/>
    </div>
  )
}

export default Home
 
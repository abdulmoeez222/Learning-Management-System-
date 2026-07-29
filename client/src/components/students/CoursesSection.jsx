import { Link } from 'react-router-dom' 
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext' 
import CourseCard from './CourseCard'
const CoursesSection = () => {

  const{allCourses} = useContext(AppContext)
  return (  
    <div className = 'py-16 md:px-40 px-8 flex flex-col items-center text-center'>
      <h2 className ='text-3xl font-medium text-gray-800'>Learn from the best</h2>
      <p className = 'text-sm md:text-base text-gray-500 mt-3'>
        Discover our top-rated coursed across various categories.From coding and design to <br/> business and wellness , our courses are crafted to deliver results.
      </p>
      

      <div className='grid grid-cols-auto px-4 md:px-0 md:my-16 gap-4'>
        {allCourses.slice(0,4).map((course , index) =>(
          <CourseCard key ={index} course = {course}/>
        ))}
      </div>
      <Link to = {'/course-list'} onClick ={() => window.scrollTo(0,0)}>
        <button className = 'text-gray-500 border border-gray-500/80 px-10 py-3 mt-10 rounded'>Show all Courses</button>
      </Link>
    </div>
  )
}


export default CoursesSection

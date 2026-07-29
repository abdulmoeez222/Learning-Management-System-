import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/students/Loading'
import { assets } from '../../assets/assets'
import Footer from '../../components/students/Footer'

const CourseDetails = () => {
  const { id } = useParams()
  const [courseData, setCourseData] = useState(null)
  const [openSections, setOpenSections] = useState({})
  
  const { allCourses, calculateRating, currency } = useContext(AppContext)

  const fetchCourseData = () => {
    const findCourse = allCourses.find((c) => c._id === id)
    setCourseData(findCourse)
  }

  useEffect(() => {
    fetchCourseData()
  }, [allCourses]) 

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  if (!courseData) {
    return <Loading />
  }

  const rating = calculateRating(courseData)
  
  // Calculate total lectures and duration
  let totalLectures = 0
  let totalDuration = 0
  courseData.courseContent.forEach(chapter => {
    totalLectures += chapter.chapterContent.length
    chapter.chapterContent.forEach(lecture => {
      totalDuration += lecture.lectureDuration
    })
  })

  // Format duration
  const formatDuration = (minutes) => {
    const hrs = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`
  }

  // Calculate discounted price
  const discountedPrice = (courseData.coursePrice - (courseData.coursePrice * courseData.discount / 100)).toFixed(2)

  return (
    <>
      <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-20 pt-10 text-left z-0'>
        
        <div className='absolute top-0 left-0 w-full h-section-height -z-10 bg-gradient-to-b from-cyan-100/70'></div>

        {/* Left Column */}
        <div className='max-w-xl z-10 text-gray-500'>
          <h1 className='md:text-text-course-deatails-heading-large text-text-course-deatails-heading-small font-semibold text-gray-800'>
            {courseData.courseTitle}
          </h1>
          
          <p className='pt-4 md:text-base text-sm' 
             dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) + '...' }}></p>
          
          <div className='flex items-center space-x-2 pt-3 pb-1 text-sm'>
            <p>{rating}</p>
            <div className='flex'>
              {[...Array(5)].map((_, i) => (
                <img key={i} src={i < Math.floor(rating) ? assets.star : assets.star_blank} alt="star" className='w-3.5 h-3.5' />
              ))}
            </div>
            <p className='text-blue-600'>({courseData.courseRatings.length} ratings)</p>
            <p>{courseData.enrolledStudents.length} students</p>
          </div>
          
          <p className='text-sm'>Course by <span className='text-blue-600 underline'>Educator</span></p>

          <div className='pt-8 text-gray-800'>
            <h2 className='text-xl font-semibold'>Course Structure</h2>
            <div className='pt-5 pb-3'>
              {courseData.courseContent.map((chapter, index) => (
                <div key={index} className='border border-gray-300 bg-white mb-2 rounded'>
                  <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none' 
                       onClick={() => toggleSection(index)}>
                    <div className='flex items-center gap-2'>
                      <img className={`transform transition-transform ${openSections[index] ? 'rotate-180' : ''}`} 
                           src={assets.down_arrow_icon} alt="arrow" />
                      <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                    </div>
                    <p className='text-sm md:text-default'>{chapter.chapterContent.length} lectures - {formatDuration(chapter.chapterContent.reduce((acc, curr) => acc + curr.lectureDuration, 0))}</p>
                  </div>
                  
                  {openSections[index] && (
                    <div className='px-4 py-3 border-t border-gray-300'>
                      {chapter.chapterContent.map((lecture, i) => (
                        <div key={i} className='flex items-center justify-between py-2'>
                          <div className='flex items-center gap-2'>
                            <img src={assets.play_icon} alt="play" className='w-4 h-4' />
                            <p className='text-sm text-gray-600'>{lecture.lectureTitle}</p>
                          </div>
                          <p className='text-xs text-gray-500'>{formatDuration(lecture.lectureDuration)}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className='py-8 text-gray-800'>
            <h2 className='text-xl font-semibold'>Course Description</h2>
            <div className='pt-3 text-gray-600 text-sm md:text-base rich-text' 
                 dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}></div>
          </div>
        </div>

        {/* Right Column */}
        <div className='max-w-course-card z-10 shadow-custom-card rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px]'>
          <img src={courseData.courseThumbnail} alt="course thumbnail" className='w-full object-cover' />
          
          <div className='p-6'>
            <div className='flex items-center gap-2 text-red-500 text-sm'>
              <img src={assets.time_left_clock_icon} alt="time left" />
              <p className='font-medium'>5 days left at this price!</p>
            </div>
            
            <div className='flex items-center gap-3 pt-2'>
              <p className='text-3xl font-bold text-gray-800'>{currency}{discountedPrice}</p>
              <p className='text-gray-500 line-through'>{currency}{courseData.coursePrice}</p>
              <p className='text-gray-500'>{courseData.discount}% off</p>
            </div>
            
            <div className='flex items-center text-sm text-gray-500 gap-4 pt-4 pb-6'>
              <div className='flex items-center gap-1'>
                <img src={assets.star} alt="star" className='w-3.5 h-3.5' />
                <p>{rating}</p>
              </div>
              <div className='h-4 w-px bg-gray-300'></div>
              <div className='flex items-center gap-1'>
                <img src={assets.time_clock_icon} alt="clock" />
                <p>{formatDuration(totalDuration)}</p>
              </div>
              <div className='h-4 w-px bg-gray-300'></div>
              <div className='flex items-center gap-1'>
                <img src={assets.lesson_icon} alt="lesson" />
                <p>{totalLectures} lessons</p>
              </div>
            </div>
            
            <button className='w-full bg-blue-600 text-white py-3 rounded text-base font-medium'>
              Enroll Now
            </button>
            
            <div className='pt-6'>
              <p className='font-medium text-gray-800 mb-3'>What's in the course?</p>
              <ul className='space-y-2 text-sm text-gray-600'>
                <li className='flex items-start gap-2'>
                  <span className='w-1 h-1 bg-gray-500 rounded-full mt-2'></span>
                  Lifetime access with free updates.
                </li>
                <li className='flex items-start gap-2'>
                  <span className='w-1 h-1 bg-gray-500 rounded-full mt-2'></span>
                  Step-by-step, hands-on project guidance.
                </li>
                <li className='flex items-start gap-2'>
                  <span className='w-1 h-1 bg-gray-500 rounded-full mt-2'></span>
                  Downloadable resources and source code.
                </li>
                <li className='flex items-start gap-2'>
                  <span className='w-1 h-1 bg-gray-500 rounded-full mt-2'></span>
                  Quizzes to test your knowledge.
                </li>
                <li className='flex items-start gap-2'>
                  <span className='w-1 h-1 bg-gray-500 rounded-full mt-2'></span>
                  Certificate of completion.
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </>
  )
}

export default CourseDetails
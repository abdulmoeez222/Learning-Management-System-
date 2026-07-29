import {createContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { dummyCourses } from '../assets/assets';

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const currency = import.meta.env.VITE_CURRENCY

    // eslint-disable-next-line no-unused-vars
    const [allCourses, setAllCourses] = useState(dummyCourses)

    const [isEducator, setIsEducator] = useState(false)

    const navigate = useNavigate()

    // Function to calculate average rating of a course
    const calculateRating = (course) => {
        if (course.courseRatings.length === 0) {
            return 0;
        }
        let totalRating = 0
        course.courseRatings.forEach(rating => {
            totalRating += rating.rating
        })
        return totalRating / course.courseRatings.length
    }

    const value = {
        currency, allCourses, navigate, calculateRating , isEducator , setIsEducator
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
}
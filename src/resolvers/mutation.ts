import {
    IResolvers
} from 'graphql-tools'
import database from '../data/data.store';
import _ from 'lodash'
const mutation: IResolvers = {
    Mutation: {
        addCourse(__: void, {
            course
        }): any {
            const courseItem = {
                id: String(database.courses.length + 1),
                title: course.title,
                description: course.description,
                clases: course.clases,
                time: course.time,
                level: course.level,
                logo: course.logo,
                path: course.path,
                teacher: course.teacher,
                reviews: []
            }

            if(database.courses.filter(c => c.title === courseItem.title).length === 0){
                database.courses.push(courseItem);
                return courseItem;
            }

            return {
                id: "-1",
                title: "Course already exists",
                description: "",
                clases: -1,
                time: 0.0,
                level: "ALL",
                logo: "",
                path: "",
                teacher: "",
                reviews: []
            }
          
        },
        editCourse(__:void,{course}):any {
            const result = _.findIndex(database.courses, (o)=>{
                return o.id === course.id
            })

            if (result > -1) {
                const reviews = database.courses[result].reviews;
                course.reviews = reviews;
                database.courses[result] = course;
                return course;
            }

            return {
                id: "-1",
                title: "Course not found",
                description: "",
                clases: -1,
                time: 0.0,
                level: "ALL",
                logo: "",
                path: "",
                teacher: "",
                reviews: []
            }
        },
        deleteCourse(__void,{id}):any {
            const result = _.remove(database.courses, (course)=>{
                return course.id === id
            });

            if(result[0] === undefined){
                return {
                    id: "-1",
                    title: "Course not found",
                    description: "",
                    clases: -1,
                    time: 0.0,
                    level: "ALL",
                    logo: "",
                    path: "",
                    teacher: "",
                    reviews: []
                }
            }

            return result[0];
        }
    }
}

export default mutation;
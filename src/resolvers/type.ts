import {IResolvers} from 'graphql-tools'
import database from '../data/data.store';
import _ from 'lodash';
const type: IResolvers = {
    Student: {
        courses: parent => {
            const courseList : Array<any> = [];
            parent.courses.map((course:string) => {
                courseList.push(_.filter(database.courses,['id',course])[0])
            });
            return courseList;
        }
    },
    Course: {
        students: parent => {
            const studentList : Array<any> = [];
            const courseId = parent.id;
            database.students.map((student:any)=>{
                if(student.courses.filter((id:any)=> id === courseId) > 0) {
                    studentList.push(student)
                }
            })
            return studentList;
        },
        path: parent => `https://www.udemy.com${parent.path}`
    }
}

export default type;
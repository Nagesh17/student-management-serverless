import * as uuid from 'uuid'
import { createLogger } from '../utils/logger'
import { CreateStudentRequest } from '../requests/CreateStudentRequest'

import { Student } from '../models/Student'
import { parseUserId } from '../auth/utils' // get userId from jwt token
import { StudentDao } from '../dataLayer/studentDao'
import { UpdateStudentRequest } from '../requests/UpdateStudentRequest'


const logger = createLogger('studentService')
const bucketName= process.env.STUDENT_S3_BUCKET

// initialize new object from studentAcces class: 
const studentDao = new StudentDao()

// find student list by userId from JwtToken
export async function getStudentList(jwtToken: string): Promise<Student[]> {
    logger.info(' Processing Get Students')
    const userId = parseUserId(jwtToken); 
    return studentDao.getStudents(userId);
}

// create student with corresponding userId: 
export async function createStudent(
    newStudent: CreateStudentRequest, 
    jwtToken: string
): Promise<Student> {

    const studentId = uuid.v4() // generate unique student id: 
    const userId = parseUserId(jwtToken) // return userId

    logger.info(`Service: Create Student for user ${userId}`)
    const imageUrl= `https://${bucketName}.s3.amazonaws.com/${studentId}`
    
    // const dateString = new Date().toDateString();
    return await studentDao.createStudent({
        userId, 
        studentId: studentId,
        ...newStudent, // name and dueDate
        attachmentUrl: imageUrl
    }) as Student
}

// update student Item with userId and studentId: 
export async function updateStudent(
    jwtToken: string, 
    studentId: string,
    updateStudent: UpdateStudentRequest,
) {
    await studentDao.updateStudent(parseUserId(jwtToken), studentId, updateStudent);
}

// delete student item with userId and studentid:
export async function deleteStudent(
    jwtToken: string,
    studentId: string,
) {
    await studentDao.deleteStudent(parseUserId(jwtToken), studentId);
}

export function getUploadUrl(studentId: string){
    logger.info(`Generating s3 signed url for StudentId - ${studentId}`)
    return studentDao.getUploadUrl(studentId)
}
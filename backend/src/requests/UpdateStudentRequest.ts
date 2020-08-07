/**
 * Fields in a request to update a single Student item.
 */
export interface UpdateStudentRequest {
  name: string
  dob: string,
  branch: string,
  address: string
}
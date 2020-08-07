import dateFormat from 'dateformat'
import { History } from 'history'
import update from 'immutability-helper'
import * as React from 'react'
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Header,
  Icon,
  Input,
  Image,
  Loader
} from 'semantic-ui-react'

import { createStudent, deleteStudent, getStudents, patchStudent} from '../api/student-api'
import Auth from '../auth/Auth'
import { Student } from '../types/Student'

interface StudentsProps {
  auth: Auth
  history: History
}

interface StudentsState {
  students: Student[]
  newStudentName: string
  loadingStudents: boolean
}

export class Students extends React.PureComponent<StudentsProps, StudentsState> {
  state: StudentsState = {
    students: [],
    newStudentName: '',
    loadingStudents: true
  }

  // handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   this.setState({ newStudentName: event.target.value })
  // }

  onEditButtonClick = (studentId: string) => {
    this.props.history.push(`/students/${studentId}/edit`)
  }

  // onStudentCreate = async (event: React.ChangeEvent<HTMLButtonElement>) => {
  //   try {
  //     const description = this.getDescription()
  //     // const description = 
  //     const newFeed = await createFeed(this.props.auth.getIdToken(), {
  //       name: this.state.newFeedName,
  //       description: description
  //     })
  //     this.setState({
  //       feeds: [...this.state.feeds, newFeed],
  //       newFeedName: ''
  //     })
  //   } catch {
  //     alert('Feed creation failed')
  //   }
  // }

  onDeleteStudent = async (studentId: string) => {
    try {
      await deleteStudent(this.props.auth.getIdToken(), studentId)
      this.setState({
        students: this.state.students.filter(student => student.studentId != studentId)
      })
    } catch {
      alert('Student deletion failed')
    }
  }

  // onFeedCheck = async (pos: number) => {
  //   try {
  //     const feed = this.state.feeds[pos]
  //     await patchFeed(this.props.auth.getIdToken(), feed.feedId, {
  //       name: feed.name,
  //       description: feed.description
  //     })
  //     this.setState({
  //       feeds: update(this.state.feeds, {
  //         [pos]: { done: { $set: !feed.done } }
  //       })
  //     })
  //   } catch {
  //     alert('Todo deletion failed')
  //   }
  // }

  async componentDidMount() {
    try {
      const students = await getStudents(this.props.auth.getIdToken())
      this.setState({
        students: students,
        loadingStudents: false
      })
    } catch (e) {
      alert(`Failed to fetch students: ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <Header as="h1">Students</Header>

        { this.renderCreateNewStudentButton()}
        {/* {this.renderCreateFeedInput()} */}

        {this.renderStudents()}
      </div>
    )
  }

  renderCreateNewStudentButton(){
    
      return (
        <Button onClick={this.handleClick}>CREATE</Button>
      )
    
  }

  handleClick = ()=>{
    console.log('Button clicked');
      this.props.history.push(`/students/create`)
  }

  // renderCreateFeedInput() {
  //   return (
  //     <Grid.Row>
  //       <Grid.Column width={16}>
  //         <Input
  //           action={{
  //             color: 'teal',
  //             labelPosition: 'left',
  //             icon: 'add',
  //             content: 'New feed',
  //             onClick: this.onFeedCreate
  //           }}
  //           fluid
  //           actionPosition="left"
  //           placeholder="To change the world..."
  //           // onChange={this.handleNameChange}
  //         />
  //       </Grid.Column>
  //       <Grid.Column width={16}>
  //         <Divider />
  //       </Grid.Column>
  //     </Grid.Row>
  //   )
  // }

  renderStudents() {
    if (this.state.loadingStudents) {
      return this.renderLoading()
    }

    return this.renderStudentsList()
  }

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Loading STUDENTs
        </Loader>
      </Grid.Row>
    )
  }
  // name: string
  // dob: string
  // year: string
  // branch: string
  // address: string
  // attachmentUrl?: string
  renderStudentsList() {
    return (
      <Grid padded>
        {this.state.students.map((student, pos) => {
          return (
            <Grid.Row key={student.studentId}>
              {/* <Grid.Column width={1} verticalAlign="middle">
                <Checkbox
                  onChange={() => this.onFeedCheck(pos)}
                  checked={feed.done}
                />
              </Grid.Column> */}
              <Grid.Column width={2} verticalAlign="middle">
                {student.name}
              </Grid.Column>
              <Grid.Column width={2} verticalAlign="middle">
                {student.dob}
              </Grid.Column>
              <Grid.Column width={2} verticalAlign="middle">
                {student.year}
              </Grid.Column>
              <Grid.Column width={2} verticalAlign="middle">
                {student.branch}
              </Grid.Column>
              <Grid.Column width={4} verticalAlign="middle">
                {student.address}
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="blue"
                  onClick={() => this.onEditButtonClick(student.studentId)}
                >
                  <Icon name="pencil" />
                </Button>
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="red"
                  onClick={() => this.onDeleteStudent(student.studentId)}
                >
                  <Icon name="delete" />
                </Button>
              </Grid.Column>
              {student.attachmentUrl && (
                <Image src={student.attachmentUrl} size="small" wrapped />
              )}
              <Grid.Column width={16}>
                <Divider />
              </Grid.Column>
            </Grid.Row>
          )
        })}
      </Grid>
    )
  }
}

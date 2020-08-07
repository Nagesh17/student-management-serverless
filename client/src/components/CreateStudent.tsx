import * as React from 'react'
import { Form, Button } from 'semantic-ui-react'
import Auth from '../auth/Auth'
import { createStudent} from '../api/student-api'
// import Button from 'react-bootstrap';

interface CreateStudentProps {
  auth: Auth
}

interface StudentState {
  name: string
  dob: string
  year: string
  branch: string
  address: string
}

export class CreateStudent extends React.PureComponent<
  CreateStudentProps,
  StudentState>
 {
  state: StudentState = {
      name: '',
      dob: '',
      branch: '',
      year: '',
      address: ''
  }


  render() {
//     return (<React.Fragment>
// <Form>
//   <Form.Group controlId="exampleForm.ControlInput1">
//     <Form.Label>Email address</Form.Label>
//     <Form.Control type="email" placeholder="name@example.com" />
//   </Form.Group>

// </Form>
// </React.Fragment>
      return ( 
        <div>
      <h3>Create new Student</h3>
      <form onSubmit={this.mySubmitHandler} >
      
      <label htmlFor="name">Name</label>
      <input
        type='text'
        name='name'
        value={this.state.name}
        className='form-control'
        id='name'
        onChange={this.myChangeHandler}
      />
      <br/>
      <label htmlFor="dob">Date of birth</label>
      <input
        type='text'
        name='dob'
        value={this.state.dob}
        className="form-control"
        id="dob"
        onChange={this.myChangeHandler}
      />
      <br/>
      <label htmlFor="branch">Branch</label>
      <input
        type='text'
        name='branch'
        id="branch"
        value={this.state.branch}
        className="form-control"
        onChange={this.myChangeHandler}
      />
      <br/>
      <label htmlFor="year">Year(FE/SE/TE/BE)</label>
      <input
        type='text'
        name='year'
        id="year"
        className="form-control"
        value={this.state.year}
        onChange={this.myChangeHandler}
      />
      <br/>
      <label htmlFor="address">Residence address</label>
      <input
        type='text'
        name='address'
        id="address"
        className="form-control"
        value={this.state.address}
        onChange={this.myChangeHandler}
      />
      <br/>
      <br/>
      <input
        type='submit'
      />
      </form>
      </div> 
    );
  }

  mySubmitHandler= async (event: React.SyntheticEvent) => {
      event.preventDefault();
      try{
        await createStudent(this.props.auth.getIdToken(),{
          name: this.state.name,
          dob: this.state.dob,
          branch: this.state.branch,
          year: this.state.year,
          address: this.state.address
        })

        alert('Student Created Successfully !!!!')
      }
      catch(e){
          alert('Could not create new student '+ e.message);
      }
      finally{
        this.setState({
          name: '',
          dob: '',
          branch :'',
          year:'',
          address: ''
        });
      }
  }

  myChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    let nam = event.currentTarget.name;
    let val = event.currentTarget.value;
    this.setState({
      ... this.state,
      [nam] : val
    });
  }

}
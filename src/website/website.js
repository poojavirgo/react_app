import React,{Component} from 'react';
import './website.css';

class Website extends Component{
  constructor(props){
    super(props);
    this.nameRef = React.createRef();
    this.ageRef = React.createRef();
    this.gender = '';
  }

  state={
    persons:[],
    selectedButton: '',
    apiResult: [],
  }

  submitHandler = (event) => {
    event.preventDefault();
    const persons = [...this.state.persons];
    const person = {
      name: this.nameRef.current.value,
      age: this.ageRef.current.value,
      gender: this.gender
    }
    if(this.gender.length === 0 || !this.nameRef.current.value || !this.ageRef.current.value){
      window.alert('Please Fill / Select All Fields');
      return;
    }
    console.log(person);
    persons.push(person);
    this.setState({
      persons:persons,
      selectedButton: ''
    }, () => {
      this.nameRef.current.value = '';
      this.ageRef.current.value = '';
      this.gender = '';
    })
  }  

  genderSelectHandler = (event,gender) => {
    event.preventDefault();
    this.gender = gender;
    this.setState({
      selectedButton: gender
    })
  }

  componentDidMount(){
    fetch('https://api.suntist.com/aboutus/')
      .then(response => {
        return response.json();
      }).then(body => {
        this.setState({apiResult : body.results})
      }).catch(err => {
        console.log(err);
      })
  }

render(){
  let personList = null;
  if(this.state.persons.length){
    personList = this.state.persons.map((person,index) => {
      return(
        <div className="table__row" key={index+person.name}>
          <div className="table__column table__column--big">{person.name}</div>
          <div className="table__column table__column--small">{person.age}</div>
          <div className="table__column table__column--small">{person.gender}</div>
        </div>
        )
    })
  }
  let categoryList = null;
  if(this.state.apiResult.length){
    categoryList = this.state.apiResult.map((result, index) => {
      return(
        <div className="table__row" key={index+result.category}>
          <div className="table__column table__column--small">{result.category}</div>
          <div className="table__column table__column--big">{result.description}</div>
        </div>
        )
    })
  }
  return(
   <div>
    <header className="heading">
        <h2>SUNTIST</h2>
    </header>
    <section className="formCenter">
       <form >
         <div>
         <input className="inputBox"
         type="text" 
         name="Name"
         ref={this.nameRef}
         placeholder="Enter your name"
         />
         </div>
         <br></br>
         <div>
         <input className="inputBox"
         type="text" 
         name="Age"
         ref={this.ageRef}
         placeholder="Enter your age"
         />
         </div>
         <br></br>
         <div className="radio">
            <button 
             onClick={(e) => this.genderSelectHandler(e,"Male")}
             className={this.state.selectedButton === 'Male'?"button--selected radio__button" : 'radio__button'}>Male</button> 
            <button
             onClick={(e) => this.genderSelectHandler(e,"Female")}
             className={this.state.selectedButton === 'Female'?"button--selected radio__button" : 'radio__button'}>Female</button>     
          </div>
          <br></br>
       <input type="button" 
        value="Submit"
        className="button"
        onClick={this.submitHandler}/>  
       </form>
        <br></br>
       <article className="table">
         <div className="table__header">
           <div className="table__column table__column--big">Name</div>
           <div className="table__column table__column--small">Age</div>
           <div className="table__column table__column--small">Sex</div>
         </div>
         <div className="table__body">
          {personList}
         </div>
       </article>
       <article className="table" style={{marginTop: "50px"}}>
       <div className="table__header">
           <div className="table__column table__column--small">Categotry</div>
           <div className="table__column table__column--big">Description</div>
         </div>
         <div className="table__body">
            {categoryList}
          </div>
       </article>
    </section>
   </div>
  );
}


}

export default Website;
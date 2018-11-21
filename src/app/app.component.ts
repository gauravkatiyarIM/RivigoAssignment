import { Component, ElementRef } from '@angular/core';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public nameList: any;
  public data: any;
  public teamId: any;
  public EmpList: any;
  public empId: any;
  public query = '';
  public query2 = '';
  newTeam: any = {};
  public newEmp = "";
  teamForm: boolean = false;
  empForm: boolean = false;
  isNewTeam: boolean;
  isNewEmp: boolean;
  isTeamSelected: boolean = false;
  isEmpSelected: boolean = false;
  public teams = [];

  public filteredList = [];
  public filteredList2 = [];
  public elementRef;


  constructor(myElement: ElementRef) {
    this.getNameList();
    this.elementRef = myElement;
  }
  getNameList() {
    this.nameList = [
      {
        Team: 'Engineering',
        employees: ['Lawana Fan', 'Larry Rainer', 'Aman Juneja', 'Leah Shumway']
      },
      {
        Team: 'Executive',
        employees: ['Rohan Gupta', 'Ronda Dean', 'Robby Maharaj']
      },
      {
        Team: 'Finance',
        employees: ['Caleb Brown', 'Carol Smithson', 'Carl Sorensen']
      },
      {
        Team: 'Sales',
        employees: ['Ankit Tiwari', 'Ramesh Kumar']
      }
    ]

  }


  filter() {
    if (this.query !== "") {
      this.filteredList = this.nameList.filter(function (el) {
        return (el.Team.toLowerCase().substr(0, this.query.length) ==
          this.query.toLowerCase()) == true;
      }.bind(this));
    }
    else {
      this.filteredList = [];
    }
    console.log(this.filteredList);
  }

  select(item) {
    this.query = item.Team;
    console.log(JSON.stringify(item.Team));
    this.filteredList = [];
    this.EmpList = item.employees;
    console.log(JSON.stringify(this.EmpList))
    this.isTeamSelected = true;
  }

  filter2() {

    if (this.query2 !== "") {
      this.filteredList2 = this.EmpList.filter(function (el) {
        return (el.toLowerCase().substr(0, this.query2.length) ==
          this.query2.toLowerCase()) == true;
      }.bind(this));

    } else {
      this.filteredList2 = [];
    }


  }

  select2(item2) {
    this.query2 = item2;
    console.log(item2);
    this.filteredList2 = [];
    this.isEmpSelected = true;

  }

  noneSelected() {
    return (this.isTeamSelected && this.isEmpSelected);
  }
  noTeamSelected() {
    return this.isTeamSelected;
  }
  onSubmit() {
    if (this.isEmpSelected && this.isTeamSelected) {
      alert("Selected Team is " + this.query + " and Selected Employee is " + this.query2);
    } else {
      alert("Please select Team and its Employee");
    }

  }

  onClear() {
    this.query = "";
    this.query2 = "";
    this.isEmpSelected = !this.isEmpSelected;
    this.isTeamSelected = !this.isTeamSelected;
  }

  showAddTeamForm() {
    this.teamForm = true;
    this.isNewTeam = true;

  }
  saveTeam = function (newTeam) {
    if (this.isNewTeam) {
      this.nameList.push({ Team: newTeam.Team, employees: [] });
      console.log(newTeam.Team);
      alert("New Team " + newTeam.Team + " is added");

    }
    this.teamForm = false;
  }
  cancelNewTeam() {
    this.newTeam = {};
    this.teamForm = false;
  }
  showAddEmpForm() {

    this.empForm = true;
    this.isNewEmp = true;

  }
  saveEmp(newEmp) {
    if (this.isNewEmp) {
      console.log(this.query);
      console.log(newEmp);
      this.nameList.forEach(element => {
        if (element.Team == this.query) {
          element.employees.push(newEmp)
        }
      });
      alert("New Employee " + newEmp + " is added in Team "+ this.query);
    }
    this.empForm = false;
    console.log(">>>>", JSON.stringify(this.nameList));
  }
  cancelNewEmp() {
    this.newEmp = "";
    this.empForm = false;
  }
}

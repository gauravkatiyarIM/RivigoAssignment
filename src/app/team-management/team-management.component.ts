import { Component,  ElementRef } from '@angular/core';
import { datalist } from './team-data';


@Component({
  selector: 'app-team-management',
  templateUrl: './team-management.component.html',
  styleUrls: ['./team-management.component.css']
})
export class TeamManagementComponent{

  public teamData: any;
  public EmpList: any;
  public teamQuery = '';
  public empQuery = '';
  newTeam: any = {};
  public newEmp = "";
  teamForm: boolean = false;
  empForm: boolean = false;
  isNewTeam: boolean;
  isNewEmp: boolean;
  isTeamSelected: boolean = false;
  isEmpSelected: boolean = false;
  disableTeamInput: boolean = false;
  newTeamInput: boolean = false;
  newEmpInput: boolean = false;
  hideFooter: boolean = false;
  public teams = [];
  public filteredTeamList = [];
  public filteredEmpList = [];
  public elementRef;



  constructor(myElement: ElementRef) {
    this.getTeamData();
    this.elementRef = myElement;
  }

  getTeamData() {
    this.teamData = datalist
  }

  teamFilter() {
    if (this.teamQuery !== "") {
      this.filteredTeamList = this.teamData.filter(function (el) {
        return (el.Team.toLowerCase().substr(0, this.teamQuery.length) ==
          this.teamQuery.toLowerCase()) == true;
      }.bind(this));
    }
    else {
      this.filteredTeamList = [];
      if(this.teamQuery == null || this.teamQuery !== this.teamData.Team)
      {this.isTeamSelected = false;} 
    }
    console.log(this.filteredTeamList);
  }

    selectTeam(item) {
    this.teamQuery = item.Team;
    console.log(JSON.stringify(item.Team));
    this.filteredTeamList = [];
    this.EmpList = item.employees;
    console.log(JSON.stringify(this.EmpList))
    this.isTeamSelected = true;
  }

  empFilter() {

    if (this.empQuery !== "") {
      this.filteredEmpList = this.EmpList.filter(function (el) {
        return (el.toLowerCase().substr(0, this.empQuery.length) ==
          this.empQuery.toLowerCase()) == true;
      }.bind(this));

    } else {
      this.filteredEmpList = [];
    }
  }

  selectEmp(item) {
    this.empQuery = item;
    console.log(item);
    this.filteredEmpList = [];
    this.isEmpSelected = true;

  }

  teamSearchCheck(){
    this.isTeamSelected = false;
    this.empQuery = ""
  }

  noneSelected() {
    return (this.isTeamSelected && this.isEmpSelected);
  }
  noTeamSelected() {
    return this.isTeamSelected;
  }
 
 
  showAddTeamForm() {
    this.teamForm = true;
    this.isNewTeam = true; 
    this.hideFooter = true;
  }

  newTeamInputCheck(teamInput){
    if(teamInput){
      this.newTeamInput = true;
    }
    else{
      this.newTeamInput = false
    }
    console.log(teamInput);
  }

  newEmpInputCheck(empInput){
    if(empInput){
      this.newEmpInput = true;
    }
    else{
      this.newEmpInput = false
    }
    console.log(empInput);
  }

  saveNewTeam = function (newTeam) {
    
    if (this.isNewTeam) {
      this.teamData.push({ Team: newTeam.Team, employees: [] });
      console.log(newTeam.Team);
      alert("New Team " + newTeam.Team + " is added");
    }
    
    this.teamForm = false;
    this.teamQuery = "";
    this.empQuery = "";
    this.isTeamSelected = false;
    this.newTeam = {};  
    this.isEmpSelected = false;
    this.hideFooter = false;
  }
  cancelNewTeam() {
    this.newTeam = {};
    this.teamForm = false;
    this.hideFooter = false;
  }
  showAddEmpForm() {

    this.empForm = true;
    this.isNewEmp = true;
    this.empQuery = "";
    this.disableTeamInput = true;
    this.hideFooter = true;
  }
  saveNewEmp(newEmp) {
    if (this.isNewEmp) {
      console.log(this.teamQuery);
      console.log(newEmp);
      this.teamData.forEach(element => {
        if (element.Team == this.teamQuery) {
          element.employees.push(newEmp)
        }
      });
    
      alert("New Employee " + newEmp + " is added in Team "+ this.teamQuery);
    }
    
    this.empForm = false;
    this.empQuery ="";
    this.newEmp = "";
    this.disableTeamInput = !this.disableTeamInput;
    this.hideFooter = false;
    console.log(">>>>", JSON.stringify(this.teamData));

  }
  cancelNewEmp() {
    this.newEmp = "";
    this.empForm = false;
    this.disableTeamInput = !this.disableTeamInput;
    this.hideFooter = false;
  }

  onSubmit() {
    if (this.isEmpSelected && this.isTeamSelected) {
      alert("Selected Team is " + this.teamQuery + " and Selected Employee is " + this.empQuery);
    } else {
      alert("Please select Team and its Employee");
    }

  }

  onClear() {
    this.teamQuery = "";
    this.empQuery = "";
    this.isEmpSelected = !this.isEmpSelected;
    this.isTeamSelected = !this.isTeamSelected;
  }

}

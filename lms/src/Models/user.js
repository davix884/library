export class User{     //so admin  and  members are also users so that means that they will be extended from this class 
constructor(name,email){
this.name=name;
this.email=email;   //this.     so that the properties get added 

}

getRole() {
    return 'User';   //Polymorphism means one method can have different behaviors depending on the object.
    
  }

}







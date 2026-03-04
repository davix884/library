import {User} from './User';

export class  Members extends User{
 constructor(name,email){
super(name,email);

 }

borrowBook(book){    //provided a book is passed to this borrow-book function then the memeber will be able to boroow a book

}


returnBook(bookid){
}

    






getRole(){
    return'Member'
}

}



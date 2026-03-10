export class LibrarySystem{

#books;//This is my private variable that only this class  can access 

constructor(){

this.#books=[];//I am now creating an empty array  to store books inside this object 

}


addBook(book){

    this.#books.push(book);

}

getAvailableBooks(){

return this.#books.filter(book=>book.isAvailable);


}


getAllBooks(){
   
return this.#books
}


}
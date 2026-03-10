export class Book{
constructor(title,author,genre){     //the book class has the properties title,author and genre 
this.id=crypto.randomUUID();
this.title=title;   //the object property this.title gets the value passed as "title"
this.author=author;
this.genre=genre;
this.isAvailable=true;

}
}






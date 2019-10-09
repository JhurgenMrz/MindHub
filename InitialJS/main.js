console.log('Starting Javascript...');

let bookData = {
    "book_id": "79141967",
    "title": "Ysabel",
    "author_lf": "Kay, Guy Gavriel",
    "author_fl": "Guy Gavriel Kay",
    "author_code": "kayguygavriel",
    "ISBN": "0143016695",
    "ISBN_cleaned": "0143016695",
    "publicationdate": "2007",
    "entry_stamp": "1318989423",
    "entry_date": "Oct 18, 2011",
    "copies": "1",
    "dateacquired_date": "Dec 31, 1969"
};

let  strBook = JSON.stringify(bookData);
console.log(bookData.title);
let jsonBook = JSON.parse(strBook)
console.log(jsonBook)


let myName= 'Jhurgen'
let age = 20
let ignasiAge = 32
let ageDiff = ignasiAge - age

console.log(myName, age, ageDiff);

//Writing code with conditionals

if (age>21) {
    console.log('You are older than 21');
}else{
    console.log('You are not older than 21');
}

if(age<ignasiAge){
    console.log('You are younger');
}else if(age === ignasiAge){
    console.log('You are 32');
}else if(age>ignasiAge){
    console.log('You are older');
}

//JavaScript Array Functions

    //Sorting an Array

    let persons = ["Jhurgen","Victor","Pablo","Alan","Juan","Pedro","Kevin"]
    let personsOrdenadas = persons.sort()
    console.log(personsOrdenadas); //Orden alfabeticamente
    console.log(persons[0]); //Print first person
    let len = persons.length
    console.log(persons[len-1]);
    console.log('/// All People :D ///');
    for(let i = 0; i < persons.length; i++){
        console.log(persons[i]);
    }

    //Looping over an array

    let ageAllPersons = [20,19,18,20,25,24,19]

    // let count = 0;
    // while (count < ageAllPersons.length) {

    //     if((ageAllPersons[count] % 2) == 0){
    //         console.log('Par ',ageAllPersons[count]);
    //     }

    //     count = count+1
    // }

    for(let i = 0; i<ageAllPersons.length; i++){
        // console.log(ageAllPersons[i]);
        if((ageAllPersons[i] % 2) == 0){
            console.log(`Numero Par ${ageAllPersons[i]}`);
        }
    }

    // Functions that use arrays
    //Exercise 3
    function LowerNumber(array){
        let minNumber = array[0]
        
        for(let i=0; i< array.length; i++){
            if(array[i]<minNumber){
                minNumber = array[i]
            }
        }
        return minNumber;

    }
    console.log(LowerNumber(ageAllPersons));

    //Exercise 4
    function BiggestNumber(array){
        let maxNumber = array[0]
        
        for(let i=0; i< array.length; i++){
            if(array[i]>maxNumber){
                maxNumber = array[i]
            }
        }
        return maxNumber;

    }
    console.log(BiggestNumber(ageAllPersons));

    //Exercise 5
    function PrintNumber(array, index){
        console.log(array);
        console.log(index);
        return console.log(`Element Select: ${array[index-1]}`);
    }

    PrintNumber(ageAllPersons, 1);

    //Exercise 6
    function RepetNumbers(array){
        let numberRepeted = []
        let numberR ;
        for(let i=0; i< array.length; i++){
            // console.log('Primer For',array[i]);
            for(let z=(i+1); z < (array.length);z++){
                console.log('Comparando ... ',array[i],array[z]);
                if(array[i] == array[z]){
                    console.log('Es igual');
                    numberR = array[i]
                    numberRepeted.push(numberR)
                    console.log(numberRepeted);
                }else{
                    console.log('No es igual');
                    console.log(numberRepeted);
                }
            }
        }
        console.log('/////////////////');
        return console.log(numberRepeted);

    }
    RepetNumbers(ageAllPersons)

    // Exercise 7
    let myColor = ["Red","Green","White","Black"];
    console.log(myColor.join(`,`))


    // Javascript String Functions
    
    //Exercise 1
    let numbers = 1234567890
    function ReverseNumber(variable){
        let converterNumb = variable.toString()
        let variableStr = converterNumb.split("")
        let reverseArray = variableStr.reverse()
        let joinArray = reverseArray.join("")
        return joinArray
    }
    console.log(ReverseNumber(numbers))

    //Exercise 2
    let palabraRandom = 'ZBXIUCbxza'
    console.log(palabraRandom);
    function OrdenarPalabras (palabra){
        let palabrasUpper = palabra.toUpperCase()
        let palabraArray = palabrasUpper.split("")
        let palabrasOrdenadas = palabraArray.sort()
        let joinPalabras = palabrasOrdenadas.join("")
        return joinPalabras
    }

    console.log(OrdenarPalabras(palabraRandom));


    //Exercise 3
    let WordExample = 'prince of persia'
    console.log(WordExample);
    function UpperFirstLetter (word) {
        let newWord = []
        let words = word.split(" ")
        for(let i=0; i< words.length; i++ ){
            
            let allLetters = words[i].split("")
            let upperLetter = allLetters[0].toUpperCase()
            newWord.push(upperLetter)
            for(let y=1; y < allLetters.length; y++){
                newWord.push(allLetters[y])
                if(y == (allLetters.length-1)){
                    newWord.push(' ')
                }
            }
            
        }
        return console.log(newWord.join(""));
    }
    UpperFirstLetter(WordExample)

    //Exercise 4
    let WordExample2 = "Web Development Tutorial"
    function LongestWord(word){
        let newWord = word.split(" ")
        let MostLongest = []
        for(let i = 0; i < (newWord.length-1); i++){
            console.log(newWord[i].length , newWord[i+1].length);
            if(newWord[i].length > newWord[i+1].length){
                MostLongest = newWord[i]
            }else{
                MostLongest = newWord[i+1]
            }
        }
        return console.log(MostLongest);
    }

    LongestWord(WordExample2)

This is final project for ibm full stack devlopment - backend certicate 

These are the required sulotions for the 13 tasks

Task 1: 
theia@theia-sahibh8239:/home/project$ curl localhost:5000
{
    "1": {
        "author": "Chinua Achebe",
        "title": "Things Fall Apart",
        "reviews": {}
    },
    "2": {
        "author": "Hans Christian Andersen",
        "title": "Fairy tales",
        "reviews": {}
    },
    "3": {
        "author": "Dante Alighieri",
        "title": "The Divine Comedy",
        "reviews": {}
    },
    "4": {
        "author": "Unknown",
        "title": "The Epic Of Gilgamesh",
        "reviews": {}
    },
    "5": {
        "author": "Unknown",
        "title": "The Book Of Job",
        "reviews": {}
    },
    "6": {
        "author": "Unknown",
        "title": "One Thousand and One Nights",
        "reviews": {}
    },
    "7": {
        "author": "Unknown",
        "title": "Njál's Saga",
        "reviews": {}
    },
    "8": {
        "author": "Jane Austen",
        "title": "Pride and Prejudice",
        "reviews": {}
    },
    "9": {
        "author": "Honoré de Balzac",
        "title": "Le Père Goriot",
        "reviews": {}
    },
    "10": {
        "author": "Samuel Beckett",
        "title": "Molloy, Malone Dies, The Unnamable, the trilogy",
        "reviews": {}
    }
}

Task 2:
theia@theia-sahibh8239:/home/project$ curl localhost:500/isbn/3
{
    "author": "Dante Alighieri",
    "title": "The Divine Comedy",
    "reviews": {}
}

Task 3:
theia@theia-sahibh8239:/home/project$ curl localhost:500/author/Hans%20Christian%20Andersen
[
    {
        "author": "Hans Christian Andersen",
        "title": "Fairy tales",
        "reviews": {}
    }
]

Task 4:
theia@theia-sahibh8239:/home/project$ curl localhost:500/title/Pride%20and%20Prejudice     
[
    {
        "author": "Jane Austen",
        "title": "Pride and Prejudice",
        "reviews": {}
    }
]

Task 5: 
theia@theia-sahibh8239:/home/project$ curl localhost:500/review/4                     
{}

Task 6: 
theia@theia-sahibh8239:/home/project$ curl -X POST http://localhost:5000/register -H "Content-Type: application/json" -d "{\"username\":\"testuser\",\"password\":\"testpass\"}"
{"message":"User successfully registered. Now you can login"}

Task 7:
theia@theia-sahibh8239:/home/project$ curl -X POST http://localhost:5000/customer/login \
-H "Content-Type: application/json" \
-d "{\"username\":\"testuser\",\"password\":\"testpass\"}"
{"message":"User successfully logged in"}

Task 8:
theia@theia-sahibh8239:/home/project$ curl -c cookies.txt -X POST http://localhost:5000/customer/login \
-H "Content-Type: application/json" \
-d "{\"username\":\"testuser\",\"password\":\"testpass\"}"
{"message":"User successfully logged icurl -b cookies.txt -X PUT "http://localhost:5000/customer/auth/review/1?review=This_book_is_absolutely_amazing"
{"message":"Review successfully added"}

Task 9:
theia@theia-sahibh8239:/home/project$ curl -b cookies.txt -X DELETE http://localhost:5000/customer/auth/review/1
{"message":"Review successfully deleted"}

Task 10:


Task 11: 

Task 12: 

Task 13: 
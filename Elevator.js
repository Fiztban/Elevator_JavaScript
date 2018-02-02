// Defining colours for text clarity / variety
// source code:
// console.log('%c Oh my heavens! ', 'background: #222; color: #bada55');

//=====================================
// CODE FOR COLOURING IN TEXT IN GRAPHIC OUTPUT

// Toggle for colour coding the picture or not
var colourEverything = false;

// Creating the Colour Object based on whether we are colouring in text. If we are not the myColour variable is set to undefined which means text will display in normal font colour.
if(colourEverything === true) {
    console.log('We ARE colouring in text'); // Check Status
    var myColour = {
        red : 'color:#e80000',
        yellow : 'color:#f4e804',
        orange : 'color:#e88300',
        green: 'color:#06ce00',
        blue: 'color:#001be8',
        cyan: 'color:#00e8d4',
        white: 'color:#ffffff',
        black: 'color:#000000',
        grey: 'color:#4e4e51'
    };
} else {
    console.log('We are NOT colouring in text'); // Marking status
    var myColour = {
        // All colours set to undefined in successive colour calls using myColour['colour']
        red : '',
        yellow : '',
        orange : '',
        green: '',
        blue: '',
        cyan: '',
        white: '',
        black: '',
        grey: ''
    };
};

// Colouring function applicable to a single line of console text
// If colourEveruthing === false then myColour[colour] === undefined, in this case only the string will be returned.
function colourIt (string, colour) {
    if (colourEverything === false) {
        console.log(string)
    } else {
    console.log('%c' + string, myColour[colour])
    }
}

// ===============================================================
// SETTING UP THE BUILDING AND LIFT OBJECTS

// Here are the basic values of the building's structure
var totalFloors = 5;
var basementFloors = 2;

// The lift object and its function to arm it
var theLift = {
    currentFloor : 1,
    maxCapacity : 10,
    currentFill : function(){ //checked this function, it works
        var sum = 0;
        for (i = 0-basementFloors; i <= totalFloors-basementFloors-1; i++) {
            sum += this.passengerTravel[i]
        }
        return sum;
    },
    passengerTravel : { // Data of where each passenger wishes to travel aboard the lift
        // This is by a function
    },
    travelDirection : 'Up' // can only be 'Up' or 'Down' or 'Still' all with capitals
};

// IIFE to populate the theLift.passengerTravel object with data related to totalFloors and basementFloors
(function populateLift (floors, basements, lift) {
    
    // Setting defaults
    var floors = floors || totalFloors;
    var basements = basements || basementFloors;
    var lift = lift || theLift;
    
    for (i = 0-basements; i < floors-basements; i++) {
        (function (j) {
            lift.passengerTravel[j] = 0;
        }(i))
    };
}());


// Function to build the building object
var theBuilding = {};


// The function returns an object building with as many floors as a specified value of floors.
// STATUS: tested, works and implemented as IIFE
(function makeBuilding (floors, basements, building) {
    
    // Setting defaults
    var floors = floors || totalFloors;
    var basements = basements || basementFloors;
    var building = building || theBuilding;
    
    for (i = 0-basements; i < floors-basements; i++) {
        (function (j){
            console.log('Floor ' + j + ' has been added.')
            building[j] = {}
            
            var thisLocation = building[j] // This creates a location for the next for loop to work and add 
            
            // Now to add data of people wanting to travel to other floors for each floor in the object
            for (j = 0-basements; j < floors-basements; j++) {
                (function (k) {
                    if (k !== i) { // This makes sure that there are no people wishing to travel to the same floor they are on as this would be redundant and they wouldn't use the lift.
                        thisLocation[k] = Math.floor(Math.random() * 3)
                    };
                    
                }(j))
            };
        }(i))
    };
    console.log('the Building has been done')
}());


// Function to add the goingUp and goingDown functions to each floor of theBuilding object
// STATUS: tested, works and implemented as IIFE
(function addDataToLift (floors, basements, building) {
    
    // Setting up defaults
    var floors = floors || totalFloors;
    var basements = basements || basementFloors;
    var building = building || theBuilding;
    
    for (i = 0-basements; i <= floors-basements-1; i++) {
        
        // Need to use an IIFE to create an execution context that preserves the value of i for each function added per floor to calculate goingUp and goingDown people sums.
        
        // goingUp function
        (function(j) {
            building[j].goingUp = function () {
                var sum = 0;
                var thisFloor = j;
                for (k = 0-basements; k < floors-basements; k++) {
                    if (k !== thisFloor && k > thisFloor) {
                        sum += this[k]
                    }
                };
                return sum;
            }
        }(i));
        
        // goingDown function
        (function(j) {
            building[j].goingDown = function () {
                var sum = 0;
                var thisFloor = j;
                for (k = 0-basements; k < floors-basements; k++) {
                    if (k !== thisFloor && k < thisFloor) {
                        sum += this[k]
                    }
                };
                return sum;
            }
        }(i))
    }
}());






//==============================
// GRAPHIC REPRESENTATION OF THE BUILDING

// Function to display building graphic
function drawBuilding (floors, basements, building, lift) {
    
    // Setting up defaults
    var floors = floors || totalFloors;
    var basements = basements || basementFloors;
    var lift = lift || theLift;
    var building = building || theBuilding;
    
    // All the different components of the building:
    // Floor separators
    function separatorDraw (k) {
        if (k !== -1) {
           return '----------------------------------';
        } else {
           return '==================================== Basement';
        }
    };
    
    // Lift shaft and lift with currentFill
    var fullLift = '|| \t ' + lift.currentFill() + '\t ||';
    
    var noLift = '| \t\t  |';
    
    // Draw the roof
    console.log('  ____________________________________________');
    console.log(' /____________________________________________\\')
    
    // Floor display logic 
    for (j = floors-basements-1; j >= 0-basements; j--) { // Have to use j as iterative key as the lift.currentFill() function also uses a for loop with i
        
        var floorText = '\t Up    '  + building[j].goingUp() + '\t Down \t' + building[j].goingDown() + '\t Floor \t' + j;
        
        if (j === lift.currentFloor) {
            if(j !== floors-basements-1){ // Removes top floor separator
                console.log(noLift + separatorDraw(j));
            }
            console.log(fullLift + floorText);
        } else if (j+0.5 === lift.currentFloor) { // No need to remove top floor separator as this condition will never be met
            console.log(fullLift + separatorDraw(j));
            console.log(noLift + floorText);
        } else {
            if(j !== floors-basements-1){ // Removes top florr separator
                console.log(noLift + separatorDraw(j));
            }
            console.log(noLift + floorText);
        };
    };
    
    // Draw the ground
    console.log('\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\');
};

//drawBuilding()


//==================================
// LOGIC OPERATION FOR LIFT OPERATION

// This function is being tested to work with the new testBuilding object with specific quantities of people wishing to travel to another given floor on each floor 
function liftExchange (floors, basements, building, lift) {
    
    // Setting up defaults
    var floors = floors || totalFloors;
    var basements = basements || basementFloors;
    var lift = lift || theLift;
    var building = building || theBuilding;
    
    if (testLift.currentFloor % 1 === 0) { //This makes sure lift is on a valid floor
        
        // First let passengers off for this floor
        lift.passengerTravel[lift.currentFloor] = 0
        
        // Now take on passengers based on the direction of travel up to maximum capacity        
        var sum = 0; // this will help to work out how many will be getting on
        var increment = 0; // this is used to determine whether the for loop cycles through passengers going down or up based on lift travel direction
        function incrementSize(){
            if(lift.travelDirection === 'Up'){
                increment = 1;
            } else if (lift.travelDirection === 'Down') {
                increment = -1;
            } else {
                return
            };
        };
        
        incrementSize();
        
        console.log('Lift increment is ' + increment);
        
        for(f=lift.currentFloor+increment; f <= (floors-basements-1) && f >= (0-basements); f+=increment){ // f here is the floor destination passengers wish to travel to based on whether they are up or down from the lift
            console.log('f is ' + f);
            console.log('people on floor ' + lift.currentFloor + ' travelling to floor ' + f + ' are ' + building[lift.currentFloor][f]);
            
            if (lift.currentFill() + building[lift.currentFloor][f] <= lift.maxCapacity){
                
                console.log('Adding ' + building[lift.currentFloor][f] + ' people to lift.');
                
                lift.passengerTravel[f] += building[lift.currentFloor][f];
                building[lift.currentFloor][f] -= building[lift.currentFloor][f]; // remove same number from self
                
                console.log('Lift now has ' + lift.currentFill())
            } else {
                var difference = lift.maxCapacity - lift.currentFill();
                
                console.log('Adding ONLY ' + difference + ' people to the lift')
                // remove first as difference var is dependent on the change on people in lift
                building[lift.currentFloor][f] -= difference;
                
                // Now add them to lift
                lift.passengerTravel[f] += difference;
            };            
        };
    };
};


var testTotalFloors = 5
var testBasementFloors = 1

var testBuilding = {
    "-1" : {
        0 : 1,
        1 : 2,
        2 : 0,
        3 : 1,
        goingUp : function () {
                var sum = 0;
                var thisFloor = -1;
                for (k = 0-testBasementFloors; k < testTotalFloors-testBasementFloors; k++) {
                    if (k > thisFloor) {
                        sum += this[k]
                    }
                };
                return sum;
            },
        goingDown : function () {
                var sum = 0;
                var thisFloor = -1;
                for (k = 0-testBasementFloors; k < testTotalFloors-testBasementFloors; k++) {
                    if (k < thisFloor) {
                        sum += this[k]
                    }
                };
                return sum;
            }
    },
    0 : {
        "-1" : 2,
        1 : 1,
        2 : 2,
        3 : 4,
        goingUp : function () {
                var sum = 0;
                var thisFloor = 0;
                for (k = 0-testBasementFloors; k < testTotalFloors-testBasementFloors; k++) {
                    if (k > thisFloor) {
                        sum += this[k]
                    }
                };
                return sum;
            },
        goingDown : function () {
                var sum = 0;
                var thisFloor = 0;
                for (k = 0-testBasementFloors; k < testTotalFloors-testBasementFloors; k++) {
                    if (k < thisFloor) {
                        sum += this[k]
                    }
                };
                return sum;
            }
    },
    1 : {
        "-1" : 2,
        0 : 1,
        2 : 3,
        3 : 2,
        goingUp : function () {
                var sum = 0;
                var thisFloor = 1;
                for (k = 0-testBasementFloors; k < testTotalFloors-testBasementFloors; k++) {
                    if (k > thisFloor) {
                        sum += this[k]
                    }
                };
                return sum;
            },
        goingDown : function () {
                var sum = 0;
                var thisFloor = 1;
                for (k = 0-testBasementFloors; k < testTotalFloors-testBasementFloors; k++) {
                    if (k < thisFloor) {
                        sum += this[k]
                    }
                };
                return sum;
            }
    },
    2: {
        "-1" : 1,
        0 : 2,
        1 : 0,
        3 : 1,
        goingUp : function () {
                var sum = 0;
                var thisFloor = 2;
                for (k = 0-testBasementFloors; k < testTotalFloors-testBasementFloors; k++) {
                    if (k > thisFloor) {
                        sum += this[k]
                    }
                };
                return sum;
            },
        goingDown : function () {
                var sum = 0;
                var thisFloor = 2;
                for (k = 0-testBasementFloors; k < testTotalFloors-testBasementFloors; k++) {
                    if (k < thisFloor) {
                        sum += this[k]
                    }
                };
                return sum;
            }
    },
    3 : {
        "-1" : 2,
        0 : 0,
        1 : 1,
        2 : 4,
        goingUp : function () {
                var sum = 0;
                var thisFloor = 3;
                for (k = 0-testBasementFloors; k < testTotalFloors-testBasementFloors; k++) {
                    if (k > thisFloor) {
                        sum += this[k]
                    }
                };
                return sum;
            },
        goingDown : function () {
                var sum = 0;
                var thisFloor = 3;
                for (k = 0-testBasementFloors; k < testTotalFloors-testBasementFloors; k++) {
                    if (k < thisFloor) {
                        sum += this[k]
                    }
                };
                return sum;
            }
    }
};


var testLift = {
    currentFloor : 0,
    maxCapacity : 10,
    currentFill : function(){ //checked this function, it works
        var sum = 0;
        for (i = 0-testBasementFloors; i <= testTotalFloors-testBasementFloors-1; i++) {
            sum += this.passengerTravel[i]
        }
        return sum;
    },
    passengerTravel : { // Data of where each passenger wishes to travel aboard the lift
        '-1' : 0,
        0 : 0,
        1 : 0,
        2 : 0,
        3 : 0        
    },
    travelDirection : 'Down' // MUST only be 'Up' or 'Down' or 'Still' all with capitals
};

// Simulating time delay in ms code
function wait(s){
    var start = new Date().getTime();
    var end = start;
    while(end<start + (s*1000)) {
        end = new Date().getTime();
    }
};

drawBuilding();

// Function based on identifying next floor for the lift to travel to
function nextTargetFloor(floors, basements, building, lift) {
    
    // Setting up defaults
    var floors = floors || testTotalFloors;
    var basements = basements || testBasementFloors;
    var lift = lift || testLift;
    var building = building || testBuilding;
    
    // Logic Brainstorm
    //  If the lift is empty it should look to travel to the closest end of the building (top/bottom) which has people wishing to travel to the opposite side: so if there are people on the top floor wishing to travel down and the lift is in the top half of the building it should go to them and then take them down and pick up people on the way.
    
    var topGoingDown = NaN; // Top most floor with people going down.
    var bottomGoingUp = NaN; // Bottom most floor with people going up.
    var nextFloorGoingUp = NaN; // Nearest upwards floor with people going up.
    var nextFloorGoingDown = NaN; // Nearest downwards floor with people going down.
    var liftNextOffloadFloor = NaN; // Next floor the lift wishes to travel to with its passengers.
    
    if (lift.currentFill === 0){
        
    }
}

var fakeBuilding = {
    '-4' : 0,
    '-3' : 3,
    '-2' : 0,
    '-1' : 0,
    0 : 0,
    1 : 0,
    2 : 0,
    3 : 3,
    4 : 0
}

var testingFunctionInObject = {
    currentFloor : 0,
    direction : 'Still',
    target : NaN,
    choose : function (){
        console.log('I have started')
        var thisFloor = this.currentFloor;
        var topFloor = this.currentFloor;
        var botFloor = this.currentFloor;
        
        // Finding closest upwards floor with people
        for (i=thisFloor; i<=4; i++){
            if(fakeBuilding[i]>0){
                console.log(i)
                topFloor = i;
                break
            }
        }
        
        // Finding closest downwards floor with people
        for (i=thisFloor; i >= -4; i--){
            if(fakeBuilding[i]>0){
                console.log(i)
                botFloor = i;
                break
            }
        }
        
        console.log('I have finished');
        console.log('Top floor is ' + topFloor);
        console.log('Bot floor is ' + botFloor);
        
        console.log(topFloor-thisFloor);
        console.log(thisFloor-botFloor);
        
        // If neither top or bot floor found then do nothing
        if (topFloor === thisFloor && botFloor === thisFloor){
            console.log('DO NOTHING!')
        
        // If top floor isn't found then 
        } else if (topFloor === thisFloor){
            console.log('JUST Going Up!')
        } else if (botFloor === thisFloor){
            console.log('JUST Going Down!')
        } else {
            
            // If both a top and bottom floor with people have been found
            // Deciding whether to go up or down and if equidistant choose going down
            if (topFloor-thisFloor >= thisFloor-botFloor){
            console.log('Going Down!')
            } else {
            console.log('Going Up!')
            }
        }
    }    
};

//This function governs the change in direction of a lift when it reaches the top and bottom as well as physically moves it and displays its results
// STATUS: in working condition but needs better implementation of multiple floor travel
function moveLift(floors, basements, building, lift) {
    
    // Setting defaults
    var floors = floors || totalFloors;
    var basements = basements || basementFloors;
    var lift = lift || theLift;
    var building = building || theBuilding;
    
    // This is the amount by which the lift will move for each step depending on it's stated travel direction
    var amount = 0;
    
    // Determines whether the amount var increment is going to be positive or negative
    function moveAmount() {
        if(lift.travelDirection === 'Up'){
                amount = 0.5
            } else if(lift.travelDirection === 'Down'){
                amount = -0.5
            }
    }
    
    // This function governs the display and execution of movement
    function theMove() {
        // Sets the amount var to the correct value before moving based on theLift.travelDirection
        moveAmount()
            
        if(amount > 0){
            console.log('Going UP 1 Floor')
        } else if(amount < 0){
            console.log('Going DOWN 1 Floor')
        }
            
        lift.currentFloor = lift.currentFloor + amount;
        
        wait(1.5);
        
        drawBuilding(floors, basements, building, lift);
        
        lift.currentFloor = lift.currentFloor + amount;
        
        wait(1.5);
        
        drawBuilding(floors, basements, building, lift);
        
        console.log('Floor reached');
    };
    
    // Move the lift by half in the direction that its going if not move it back
    if(lift.travelDirection === 'Up'){
        if(lift.currentFloor === floors-basements-1){
            lift.travelDirection = 'Down'
            
            console.log('The lift will now be going DOWN')
        }
        
        theMove()
        
    } else if(lift.travelDirection === 'Down'){
        if(lift.currentFloor === 0-basements){
            lift.travelDirection = 'Up'
            
            console.log('The lift will now be going UP')
        }
        
        theMove()
        
    }   
}

//=========================================
// EXTRA FUNCTIONS THAT HAD USEFUL STRUCTURE (Learning stuff)

// Test function for detecting basement floors was useful to learn how to use Object.keys(<obj>) which returns an array of the properties held by <obj> and if I add a [X] at the end I can return the array value of that one.

//function testBasement (){
//    // Because keys are held in an array that works from 0 to the totalFloors value I have to start i at 0 and if at any point it detects a negative value key then it has found a basement floor.
//    for (i = 0; i <= totalFloors; i++){
//        if (Object.keys(testBuilding)[i] < 0) {
//            console.log('I\'ve found a basement')
//        }
//        
//    }
//};

// Using a double condition in a for loop with variable increment dependent on whether up value is true or false
//function testDouble (){
//    var sum = 0;
//    
//    var up = true
//    var increment = 0
//    function incrementSize(){
//        if (up === true) {
//            increment = 1
//        } else {
//            increment = -1
//        }
//    }
//    incrementSize()
//    
//    for (i=0; i>-10 && (i/3)<1; i+=increment) {
//        sum++
//    };
//    
//    return sum;
//};
//
//console.log(testDouble());

let dateReg = /^\d{2}([./-])\d{2}\1\d{4}$/;

let birthDiv = document.getElementById("birthDiv");

//Create array of options to be added
let array = [];
let date = 1949;
for (let i = 0; date < 2000; i++) {
    array[i] = date + 1;
    date += 1;
}

//Create and append select list
let selectList = document.createElement("select");
selectList.setAttribute("id", "yearOfBirth");
birthDiv.appendChild(selectList);

//Create and append the options
for (let i = 0; i < array.length; i++) {
    let option = document.createElement("option");
    option.setAttribute("value", array[i]);
    option.text = array[i];
    selectList.appendChild(option);
}

function daysInMonth(m, y) { // m is 0 indexed: 0-11
    switch (m) {
        case 1 :
            return (y % 4 === 0 && y % 100) || y % 400 === 0 ? 29 : 28;
        case 8 :
        case 3 :
        case 5 :
        case 10 :
            return 30;
        default :
            return 31;
    }
}

function isValid(d, m, y) {
    return m >= 0 && m < 12 && d > 0 && d <= daysInMonth(m, y);
}

$('document').ready(function () {


    $(function () {
        $("#checkInDate").datepicker();
    });
    $(function () {
        $("#checkOutDate").datepicker();
    });

    $("#dayOfBirth").keyup(function() {
        $("#dayOfBirth").val(this.value.match(/[0-9]*/));
    });

    $('#submitBtn').click(function () {
        let flag = true;


        if (!$('#lName').val()) {
            alert("Last name is empty");
            flag = false;
        }

        if (!$('#fName').val()) {
            alert("First name is empty");
            flag = false;

        }
        if (!$('#password').val()) {
            alert("Password is empty");
            flag = false;

        }
        if (!isValid($('#dayOfBirth').val()
            , parseInt($('#monthOfBirth').val())
            , parseInt($('#yearOfBirth').val()))) {
            alert('Wrong birth dates parameter');
            flag = false;
        }

        let $checkIn = $("#checkInDate").datepicker('getDate');
        let $checkOut = $("#checkOutDate").datepicker('getDate');

        if ($checkIn > $checkOut
            || !$checkIn
            || !$checkOut
            || String($checkOut).match(dateReg)
            || String($checkIn).match(dateReg)
            || new Date() > $checkIn) {
            alert('Wrong check-in check-out date');
            flag = false;
        }

        if ( !$('#fName').val().match('^[a-zA-Z]{3,16}$')
            && $('#fName').val() ) {
            alert("Incorrect first name");
            flag = false;

        }
        if ( !$('#lName').val().match('^[a-zA-Z]{3,16}$')
            && $('#lName').val() ) {
            alert("Incorrect last name");
            flag = false;
        }
        if (flag){
            alert("Data is correct!!!");
        }

    });
});








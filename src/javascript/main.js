const screen = document.querySelector('.calc-typed');
const historyLogs = document.getElementById('historyLogs');
const getResult = document.getElementById('equal');
const backSpace = document.getElementById('backspace');

// Coming soon parch msg
document.addEventListener("DOMContentLoaded", function(){
    Swal.fire(
        'Coming Soon parching notes',
        'If on the screen you receive an undefined error message click again the equal button to get a hint of why it is happening.',
        'info'
    )
});

// Array witch will contain the history array
let results;

// Array witch will store the history logs
let localItems = JSON.parse(localStorage.getItem("localItems"));

if(localItems === null){
    results = [];
} else {
    results = localItems;
}

function backspace(num){
    return screen.value = num.slice(0, -1);
}

// Calculator handler, it's going to be the main function of the calculator
// to get the result and insert it into the history logs
function Calculator(num){
    let currentValue = `${num} = ${eval(num)}`;
    results.push(currentValue);
    localStorage.setItem("localItems", JSON.stringify(results));
    return screen.value = eval(num);
}

// History Handler, it's going to be the main function of the history to get the history logs
function history(results) {

    let localItems = JSON.parse(localStorage.getItem("localItems"));

    if(localItems === null){
        results = [];
    } else {
        results = localItems;
    }

    let html = results.map((result) => {
        return `<p>${result}</p>`;
    });

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
    })

    swalWithBootstrapButtons.fire({
        title: 'History',
        text: "History Logs 🐱‍🏍 ",
        icon: 'info',
        html: html,
        width: 500,
        padding: '3em',
        backdrop: `
            rgba(0,0,123,0.4)
            url("https://i.gifer.com/PYh.gif")
            left top
            no-repeat
            `,
        showCancelButton: true,
        confirmButtonText: 'Delete History Logs',
        cancelButtonText: 'Go Back',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your History Logs has been deleted.',
            'success',
            localStorage.clear()
        )
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your History Logs are safe :)',
                'success'
            )
        }
    })
}

// Event Listeners witch will scope when the user want to delete the current value on the screen (one by one)
backSpace.addEventListener('click', function(){
    backspace(screen.value);
})

// Event Listener witch will be triggered when the user click on the equal button and
// if the screen has a value or not
getResult.addEventListener('click', () => {
    if(screen.value.includes("undefined")){
        screen.value = "";
        Swal.fire(
            'Oops something has happened 🐱‍💻',
            'Error 3030, hint: undefine character detected or you do not select a character 👀',
            'error'
        )
        results.pop();
    }else{
        Calculator(document.calc.result.value);
    }
})

// history logs click event handler
historyLogs.addEventListener('click', (e) => {
    e.preventDefault();
    history(results);
})
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { set, push, ref, getDatabase, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDbfzhyMowjXzotdNa3UUbd3wVOMMTUsUc",
    authDomain: "registration-form-18695.firebaseapp.com",
    databaseURL: "https://registration-form-18695-default-rtdb.firebaseio.com",
    projectId: "registration-form-18695",
    storageBucket: "registration-form-18695.appspot.com",
    messagingSenderId: "170674399816",
    appId: "1:170674399816:web:3da7441ef15a12efbe467d",
    measurementId: "G-QQZ0NL8KY6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase()

var firstName = document.getElementById("firstName");
var lastName = document.getElementById("lastName");
var Email = document.getElementById("Email");
var password = document.getElementById("password");
var myForm = document.getElementById("myForm")

window.addData = function () {
    if (firstName.value && lastName.value && Email.value && password.value) {
        var obj = {
            firstName: firstName.value,
            lastName: lastName.value,
            Email: Email.value,
            password: password.value,
        }
        var reference = ref(db, "task/")    
        push(reference, obj)
        firstName.value = ""
        lastName.value = ""
        Email.value = ""
        password.value = ""
    } else {
        alert("please enter all data")
    }
}

var allregistrationData;
var allData;
var tabletr = document.getElementById("tabletr")
function getData() {
    const reference = ref(db, "task/")
    onValue(reference, function (taskData) {
        allregistrationData = taskData.val()
        console.log(allregistrationData, "k");
        var arr = Object.values(allregistrationData);
        console.log(arr)
        for (var i = 0; i < arr.length; i++) {
            allData = arr[i]

            tabletr.innerHTML +=
                `
        <tbody>
            <tr class="tr">
                <td>${allData.firstName}</td>
                <td>${allData.lastName}</td>
                <td>${allData.Email}</td>
                <td>${allData.password}</td>
            </tr>
        </tbody>
        `
        }
    })
}
getData()
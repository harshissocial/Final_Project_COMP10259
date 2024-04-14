// Initializing all required elements from HTML document
const form = document.querySelector("form");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const date = document.getElementById("date");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

// Sends an email to email entered in form using SMTPJS
function sendEmail() {
    const bodyMessage = `Hello ${firstName.value},<br><br> We have received your message and it will soon be reviewed by one of our team member. The information you submitted is attached below for your record.<br><br>Thank you for your patience.<br><br> Email: ${email.value}<br> Phone Number: ${phone.value}<br>Subject: ${subject.value}<br> Message: ${message.value}<br><br>`;

    Email.send({
        // Secure token created from username and password
        SecureToken: "61a99e38-babd-42c2-bc65-c1551e777aab",
        To: email.value,
        From: "fianjdzhpmojgwbqin@cazlq.com",
        Subject: subject.value,
        Body: bodyMessage
    }).then(
        message => {
            if (message == "OK") {
                // Showing a dialog box if email sent successfully
                Swal.fire({
                    title: "Success!",
                    text: "A copy of this message has been sent to your email as well.",
                    icon: "success",
                    confirmButtonColor: "#000"
                })
            }
        }
    );
}

// Adds error class to the element
function addErrors(item) {
    item.classList.add("error");
    item.parentElement.classList.add("error");
}

// Removes error class from element
function removeErrors(item) {
    item.classList.remove("error");
    item.parentElement.classList.remove("error");
}

// Checks if the parameter have atleast 5 characters
function checkName(item) {
    if (item.value.length < 5) {
        addErrors(item);
    } else {
        removeErrors(item);
    }
}

// Matches email to the acceptable regex pattern
function checkEmail() {
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    const errorTxtEmail = document.querySelector(".error-txt.email");

    if (!email.value.match(emailRegex)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");

        if (email.value != "") {
            errorTxtEmail.innerText = "Enter a valid email address";
        } else {
            errorTxtEmail.innerText = "Email Address can't be blank";
        }
    } else {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
}

// Checking if phone numbers has only 10 digits
function checkPhone() {
    const phoneRegex = new RegExp(/^\d{10}$/);
    if (phoneRegex.test(phone.value)) {
        removeErrors(phone);
    } else {
        addErrors(phone);
    }
}

// Accepting date of dd/mm/yyyy format only
function checkDate() {
    const dateRegex = new RegExp(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/);
    if (dateRegex.test(date.value)) {
        removeErrors(date);
    } else {
        addErrors(date);
    }
}

// Checks that subject is not empty
function checkSubject() {
    if (subject.value == "") {
        addErrors(subject);
    } else {
        removeErrors(subject);
    }
}

// Validate whether message is atleast 50 letters
function checkMessage() {
    if (message.value.length >= 50) {
        removeErrors(message);
    } else {
        addErrors(message);
    }
}

// Adding event listener to the submit button
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Checking all the input fields by specified methods
    checkName(firstName);
    checkName(lastName);
    checkEmail();
    checkPhone();
    checkSubject();
    checkDate();
    checkMessage();

    // Proceesing only if all fields are error free
    if (!firstName.classList.contains("error") && !lastName.classList.contains("error") && !email.classList.contains("error") && !phone.classList.contains("error") && !date.classList.contains("error") && !subject.classList.contains("error") && !message.classList.contains("error")) {
        sendEmail();
        document.contactForm.submit();
        form.reset();
        return true;
    }
});
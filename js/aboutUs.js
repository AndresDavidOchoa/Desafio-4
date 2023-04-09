const aboutUsForm = document.getElementById('aboutUsForm')
const aboutUsEmailInput = document.getElementById('aboutUsEmailInput')
const aboutUsTextArea = document.getElementById('aboutUsTextArea')
const formValues = new FormData(aboutUsForm);
//const aboutUsSubmitButton
emailjs.init('BZja3EG7XvAJUrXUQ');

async function sendEmail(e) {
    
    if (e.preventDefault){
        e.preventDefault();
    }
    
    const aboutUsFormData = new FormData(aboutUsForm);
    const senderEmail = aboutUsFormData.get('email');
    const emailContent = aboutUsFormData.get('textArea');

    console.log('senderEmail ', senderEmail);
    console.log(emailContent); 

    try {
        const response = await emailjs.send("service_aoss9gm","template_jjnhv1e",{
            from_name: "Anonimo",
            message: emailContent,
            from_email: senderEmail,
        });

        console.log('El email se envio correctamente');
        console.log(response);
    } catch (err) {
        console.log('Ha ocurrido un error en el servicio');
        console.error(err);
    }

    

    return false;
}

if (aboutUsForm.attachEvent) {
    aboutUsForm.attachEvent("submit", sendEmail);
} else {
    aboutUsForm.addEventListener("submit", sendEmail);
}
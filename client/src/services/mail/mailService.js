import axios from 'axios';

const sendEmail = (email, topic, message) => {
    const mailOptions = {
        from: email,
        to: 'piotr.dominik.sobol@gmail.com',
        subject: topic,
        text: `${message} \n\nNadawca wiadomości: ${email}`
    }

    axios.post('http://localhost:3001/api/send-email', mailOptions);
}

export default sendEmail;

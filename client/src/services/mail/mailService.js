import axios from 'axios';

const url = "http://localhost:3001";

const sendEmail = (email, topic, message) => {
    const mailOptions = {
        from: email,
        to: 'piotr.dominik.sobol@gmail.com',
        subject: topic,
        text: `${message} \n\nNadawca wiadomości: ${email}`
    }

    axios.post(`${url}/api/send-email`, mailOptions);
}

export default sendEmail;

const sendEmail = (email, topic, message) => {
    const mailOptions = {
        from: email,
        to: 'piotr.dominik.sobol@gmail.com',
        subject: topic,
        text: message
    }
}

export default sendEmail;

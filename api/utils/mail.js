sendMeetingEmail = (tester, user, offer) => {
  transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "accept your application",
    html: `congratulation your application has been accepted by ${tester.testerName} for ${offer.title}`,
  });
};

module.exports = {
  sendMeetingEmail,
};

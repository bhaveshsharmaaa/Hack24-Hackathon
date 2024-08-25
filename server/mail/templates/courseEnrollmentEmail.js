exports.courseEnrollmentEmail = (courseName, name) => {
  return `<!DOCTYPE html>
      <html>
      
      <head>
          <meta charset="UTF-8">
          <title>Course Registration Confirmation</title>
          <style>
              body {
                  background-color: #f9f9f9;
                  font-family: Arial, sans-serif;
                  font-size: 16px;
                  line-height: 1.6;
                  color: #444444;
                  margin: 0;
                  padding: 0;
              }
      
              .container {
                  max-width: 600px;
                  margin: 20px auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  text-align: center;
              }
      
              .logo {
                  max-width: 180px;
                  margin-bottom: 20px;
              }
      
              .message {
                  font-size: 22px;
                  font-weight: bold;
                  color: #333333;
                  margin-bottom: 20px;
              }
      
              .body {
                  font-size: 16px;
                  color: #555555;
                  margin-bottom: 20px;
              }
      
              .cta {
                  display: inline-block;
                  padding: 12px 24px;
                  background-color: #F6C02D;
                  color: #000000;
                  text-decoration: none;
                  border-radius: 8px;
                  font-size: 16px;
                  font-weight: bold;
                  margin-top: 20px;
                  transition: background-color 0.3s ease;
              }
      
              .cta:hover {
                  background-color: #E3B600;
              }
      
              .support {
                  font-size: 14px;
                  color: #777777;
                  margin-top: 20px;
              }
      
              .highlight {
                  font-weight: bold;
                  color: #F6C02D;
              }
          </style>
      
      </head>
      
      <body>
          <div class="container">
          
              <div class="message">Course Registration Confirmation</div>
              <div class="body">
                  <p>Dear ${name},</p>
                  <p>You have successfully registered for the course <span class="highlight">"${courseName}"</span>. We
                      are thrilled to have you onboard!</p>
                  <p>Log in to your learning dashboard to access course materials and start your journey.</p>
                  <a class="cta" href="https://AcademiaHub-edtech-project.vercel.app/dashboard">Go to Dashboard</a>
              </div>
              <div class="support">For questions or assistance, reach out to us at <a
                      href="mailto:info@AcademiaHub.com">info@AcademiaHub.com</a>. We’re here to help!</div>
          </div>
      </body>
      
      </html>`;
};

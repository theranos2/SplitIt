using System.Net;
using System.Net.Mail;

namespace split_it.Services
{
    public static class MailService
    {
        public static void SendMail(string email, string body, string subject)
        {
            MailMessage mail = new MailMessage();
            var smtpClient = new SmtpClient("smtp-mail.outlook.com")
            {
                Port = 587,
                Credentials = new NetworkCredential("split.it.enterprise@outlook.com", "QxaW9b7VzSqZUt7"),
                EnableSsl = true,
            };

            mail.IsBodyHtml = true;
            mail.Subject = subject;
            mail.Body = body;
            mail.To.Add(email);
            mail.From = new MailAddress("split.it.enterprise@outlook.com");
            smtpClient.SendMailAsync(mail);

            // will return error if failed to send
            // so please do try catch
        }


    }
}

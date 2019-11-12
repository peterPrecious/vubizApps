using System;
using System.Net.Mail;

namespace vubiz.apps
{
	public partial class testEmail : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

			string emailFrom = "peterbulloch@vfnh.com";
			string emailTo = "peter@bulloch.ca";
			string emailSubject = "This is the Subject";
			string emailBody = "This is the body";

			string result = sendMessage(emailFrom, emailTo, emailSubject, emailBody);

			Label1.Text = "{ \"status\": \"" + result + "\"}";

		}


		protected string sendMessage(string fromAddress, string toAddress, string subject, string body)
		{
			try
			{
				MailAddress emailFrom = new MailAddress(fromAddress);
				MailAddress emailTo = new MailAddress(toAddress);
				MailMessage emailMessage = new MailMessage(emailFrom, emailTo);

				emailMessage.IsBodyHtml = true;
				emailMessage.Subject = subject;
				emailMessage.Body = body.Replace(";;", "<br />");
				emailMessage.BodyEncoding = System.Text.Encoding.UTF8;

				SmtpClient client = new SmtpClient();
				client.Send(emailMessage);

				return "ok";
			}
			catch (Exception e)
			{
				return "err (" + e.InnerException + ")";
			}
		}



	}
}
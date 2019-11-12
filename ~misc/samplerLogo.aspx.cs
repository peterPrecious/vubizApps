using System;
using System.IO;
using System.Data.SqlClient;

namespace vubiz.apps
{
  public partial class samplerLogo : System.Web.UI.Page
  {
    protected void Page_Load(object sender, EventArgs e)
    {
      com.v8server v8server = new com.v8server();
      string[] files = Directory.GetFiles(Server.MapPath("/samplerLogos"));
      string connectionString = "Data Source = stagingdata,1400; Initial Catalog = apps; Persist Security Info = True; User ID = apps; Password = C8WDEzy9HPzjnDpWcFYm5UXk";
      foreach (string file in files)
      {
        string sampImage = Path.GetFileName(file);
        int period = sampImage.IndexOf(".");
        if (period > 0)
        {
          string sampId = sampImage.Substring(0, period);
          string queryString = "IF EXISTS (SELECT * FROM [V5_Vubz].[dbo].[Samp] WHERE Samp_Id = '" + sampId + "') update [V5_Vubz].[dbo].[Samp] set [Samp_Image] = '" + sampImage + "' where Samp_Id = '" + sampId + "'";
          using (SqlConnection connection = new SqlConnection(connectionString))
          {
            SqlCommand command = new SqlCommand(queryString, connection);
            command.Connection.Open();
            command.ExecuteNonQuery();
          }
        }
      }
    }
  }
}
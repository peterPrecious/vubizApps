using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace vubiz.apps
{
  public partial class sqlToCsv : System.Web.UI.Page
  {
    protected void Page_Load(object sender, EventArgs e)
    {



      StringBuilder sb = new StringBuilder();
      foreach (DataRow dr in yourDataSet)
      {
        List<string> fields = new List<string>();
        foreach (object field in dr.ItemArray)
        {
          fields.Add(field);
        }
        sb.Append(String.Join(",", fields) + Environment.NewLine);
      }

      //and save.. sb.ToString() as a .csv file

    }
  }
}
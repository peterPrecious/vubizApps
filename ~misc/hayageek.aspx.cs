using System;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Web;

namespace vubiz.apps
{
  public partial class hayageek : System.Web.UI.Page
  {
    protected void Page_Load(object sender, EventArgs e)
    {
      string samplerId = Request.Form["samplerId"];

      HttpFileCollection files = HttpContext.Current.Request.Files;
      HttpPostedFile file = files["file"];
      string fileName = files["file"].FileName;

      string[] fileBits = fileName.Split('.');
      fileName = samplerId + "." + fileBits[1];
      string path = System.Web.Hosting.HostingEnvironment.MapPath("/samplerLogos/");
      //      string complete = path + "\\" + fileName;
      string complete = path + fileName;

      // wipe out any existing sampler logos with "samplerId" prefix
      string[] picList = Directory.GetFiles(path, samplerId + ".*");
      foreach (string f in picList)
      {
        File.Delete(f);
      }

      // now save the logo with it's new name and original file type
      file.SaveAs(complete);
      string msg = "SamplerId: " + samplerId + ", File: " + file.FileName + ", Size: " + file.ContentLength + ", Type: " + file.ContentType;


      string newImg1 = @"D:\OneDrive\Webs\samplerLogos\" + samplerId + "_original.png";
      string newImg2 = @"D:\OneDrive\Webs\samplerLogos\" + samplerId + ".png";


      // convert to PNG, if not already PNG
      if (fileBits[1].ToLower() != "png")
      {
        System.Drawing.Image image = System.Drawing.Image.FromFile(complete);       // Load the image.
        image.Save(newImg1, System.Drawing.Imaging.ImageFormat.Png);                // Save the image in PNG format.       
        ResizeImage(image, 300, out double resizeWidth, out double resizeHeight);   // save resized width and height when maxed out at 300 px
        image.Dispose();
        File.Delete(complete);
      }

      // reLoad/reSave with new size
      //Bitmap original = new Bitmap(newImg1, true);
      //Bitmap reSized = new Bitmap(original, resizeWidth, resizeHeight);
      //reSized.Save(newImg2);




    }



    private void ResizeImage(Image img, double maxSize, out double resizeWidth, out double resizeHeight)
    {
      resizeWidth = img.Width;
      resizeHeight = img.Height;
      double aspect = resizeWidth / resizeHeight;
      if (resizeWidth > maxSize)
      {
        resizeWidth = maxSize;
        resizeHeight = resizeWidth / aspect;
      }
      if (resizeHeight > maxSize)
      {
        aspect = resizeWidth / resizeHeight;
        resizeHeight = maxSize;
        resizeWidth = resizeHeight * aspect;
      }
    }




  }
}
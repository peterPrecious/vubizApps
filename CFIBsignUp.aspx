<%@ 
  Page Language="C#"
  AutoEventWireup="true"
  CodeBehind="CFIBsignUp.aspx.cs"
  Inherits="vubiz.apps.CFIBsignUp"
%>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">

  <title>Learning Portal (v8)</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <link rel="stylesheet" href="//code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css" />
  <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
  <script src="//code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>

  <link href="styles/basic.css" rel="stylesheet" />
  <link href="styles/icons.css" rel="stylesheet" />

  <link href='styles/skins/cfib.css' rel='stylesheet' />
  <link href='styles/skins/cfib.less' type='text/css' rel='stylesheet/less' />
  <script src='scripts/less-1.5.1.min.js'></script>

  <style>
    .debug { /*display: normal;*/ display: none; }
  </style>

</head>

<body class="ui-mini">

  <form id="aspnetForm" runat="server">

    <%--    <p class="aspx_header">--%>
    <h2>
      <asp:Literal ID="header" runat="server">Create an Account</asp:Literal>
    </h2>
    <%--    </p>--%>

    <div style="background-color: white; margin: 20px; padding: 20px; border-radius: 0.25em;">

      <div id="ele_$$_logo" class="noPhone" style="float: right;">
        <asp:Image ID="logo" runat="server" />
      </div>

      <div class="c3">
        <asp:Literal ID="title" runat="server">Welcome. To access the CFIB Learning Center, please create an account for your organization.  Enter your email address, a private password and your first and last name. Then tap Create Account.</asp:Literal>
      </div>


      <div class="debug">

        <div style="width: 500px; margin: auto;">
          <asp:HyperLink ID="HyperLink1" runat="server" NavigateUrl="https://www.cfib-fcei.ca/english/vubiz-test.html" Target="_blank">CFIB Micro Site (EN)</asp:HyperLink>
          <br />
          <asp:HyperLink ID="HyperLink2" runat="server" NavigateUrl="https://www.cfib-fcei.ca/french/vubiz-test.html" Target="_blank">CFIB Micro Site (FR)</asp:HyperLink>
          <br />CFIB Member ID:   656068     L0G
          <br />
          <br />B16%jpR96az1<br /><a href="http://vubiz.com/vubizApps/CFIBsignUp.aspx">http://vubiz.com/vubizApps/CFIBsignUp.aspx</a><br />&nbsp;
        </div>

        <h4>...from CFIB on initial contact:</h4>
        <div style="padding-left: 20px;">
          profile:<asp:TextBox ID="inputProfile" Text="" runat="server"></asp:TextBox>must be CFIB for FCEI<br />
          ticket parameter:<asp:TextBox ID="inputTicket" Text="" runat="server" Width="300px"></asp:TextBox><br />
          ticket parameter encoded:<asp:TextBox ID="inputTicketEncoded" Text="" runat="server" Width="400px"></asp:TextBox><br />
        </div>

        <h4>...from CFIB web services:</h4>
        <div style="padding-left: 20px;">
          isValidTicket:<asp:TextBox ID="WSisValidTicket" Text="" runat="server"></asp:TextBox><br />
          memb_id:<asp:TextBox ID="WSmemb_id" Text="" runat="server"></asp:TextBox><br />
          memb_first_name:<asp:TextBox ID="WSmemb_first_name" Text="" runat="server"></asp:TextBox><br />
          memb_last_name:<asp:TextBox ID="WSmemb_last_name" Text="" runat="server"></asp:TextBox><br />
          memb_bus_name:<asp:TextBox ID="WSmemb_bus_name" Text="" runat="server"></asp:TextBox><br />
        </div>

        <h4>...entered by CFIB member at Vubiz (if valid member)</h4>

      </div>

      <div style="padding-left: 30px;">

        <div style="margin: 25px; padding: 20px; max-width: 80%; width: 500px; height: 55px; border: 5px solid red; font-size: 1.3em; color: red; text-align: center;">
          <asp:Literal ID="Literal" runat="server">Status Panel<br />Do Your Thing</asp:Literal>
        </div>

        <label>
          <asp:Literal ID="email" runat="server">Email Address:</asp:Literal></label>
        <div style="padding-left: 20px; width: 300px;">
          <asp:TextBox runat="server" ID="txtMembEmail" Width="200px"></asp:TextBox>
        </div>

        <label>
          <asp:Literal ID="password" runat="server">Password:</asp:Literal></label>
        <div style="padding-left: 20px; width: 300px;">
          <asp:TextBox runat="server" ID="txtMembPassword" TextMode="Password"></asp:TextBox>
        </div>

        <label>
          <asp:Literal ID="firstName" runat="server">First Name:</asp:Literal></label>
        <div style="padding-left: 20px; width: 300px;">
          <asp:TextBox runat="server" ID="txtMembFirstName"></asp:TextBox>
        </div>

        <label>
          <asp:Literal ID="lastName" runat="server">Last Name:</asp:Literal></label>
        <div style="padding-left: 20px; width: 300px;">
          <asp:TextBox runat="server" ID="txtMembLastName"></asp:TextBox>
        </div>

        <div class="icons" style="padding: 10px 0 0 150px; width: 190px;">
          <asp:Button
            ID="signUpButton" runat="server"
            OnClick="signUpButton_Click"
            OnClientClick="aspnetForm.target ='_self';"
            Text="Create Account" />
        </div>

        <div class="c3" style="margin-top: 50px; padding-top: 20px; text-align: center; border-top: 1px solid red;">
          <asp:Literal ID="support" runat="server">Need help? Contact us at <a href='mailto:support@vubiz.com'>support@vubiz.com</a>.</asp:Literal>

          <p style="text-align: center;">
            <a style="text-decoration: none; color: antiquewhite" href="#" onclick="$('.debug').show()">1</a>
            <a style="text-decoration: none; color: antiquewhite" href="#" onclick="$('.debug').hide()">0</a>
          </p>

        </div>



      </div>

      <div class="debug">
        <h4>...debug from VUBIZ WS (if member enrolled ok)</h4>
        <div style="padding-left: 20px;">
          custGuid:<asp:TextBox ID="WScustGuid" runat="server"></asp:TextBox><br />
          membGuid:<asp:TextBox ID="WSmembGuid" runat="server"></asp:TextBox><br />
          launchUrl:<asp:TextBox ID="launchUrl" runat="server"></asp:TextBox><br />
          <asp:Button ID="startApp" runat="server" Text="Start App" />
          <asp:HyperLink ID="HyperLink3" runat="server" Target="_blank">HyperLink</asp:HyperLink>
        </div>
      </div>

      <asp:HiddenField ID="HFmembGuid" runat="server" />
      <asp:HiddenField ID="HFmemb_id" runat="server" />
      <asp:HiddenField ID="HFlaunchUrl" runat="server" />

    </div>

  </form>
</body>
</html>

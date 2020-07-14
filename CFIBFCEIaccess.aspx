<%@ Page
  Language="C#"
  AutoEventWireup="true"
  CodeBehind="CFIBFCEIaccess.aspx.cs"
  Inherits="vubiz.apps.CFIBFCEIaccess" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">

  <title>Temporary CFIB-FCEI Access to the Learning Portal (v8)</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>

  <link href="styles/basic.css" rel="stylesheet" />
  <link href="styles/icons.css" rel="stylesheet" />

  <link href='styles/skins/cfib.css' rel='stylesheet' />
  <link href='styles/skins/cfib.less' type='text/css' rel='stylesheet/less' />
  <script src='scripts/less-1.5.1.min.js'></script>
  <style>
    h1 { font-size: 1.3em; }
    h2 { font-size: 1.2em; }
    h3 { font-size: 1.1em; }
    h1,h2,h3 {text-align:left;}

    td { vertical-align: top; padding-right:20px; }
    input { height:30px;}
    .panStatus { margin: 25px auto; padding: 20px; width: 80%; height: 55px; border: 5px solid red; font-size: 1.3em; color: red; text-align: center; }
  </style>
</head>

<body class="ui-mini">

  <form id="aspnetForm" runat="server">

    <div style="background-color: white; margin: 20px; padding: 20px; border-radius: 0.25em;">

      <div id="ele_$$_logo" class="noPhone" style="float: right;">
        <asp:Image ID="logo" runat="server" />
      </div>
      <h1>Temporary Authentication Service for CFIB Members and their Employees to access the CFIB Learning Centre</h1>

      <h2 style="margin: 30px 0">Note: only one CFIB member can "Register" but you can add your employees once inside the Learning Centre. Once registered, then subsequently you and any added employees can re-enter the Learning Centre here using the Sign In fields at right.</h2>

      <asp:Panel CssClass="panStatus" runat="server" Visible="false" ID="panStatus">
        <asp:Literal ID="Literal" runat="server"></asp:Literal>
      </asp:Panel>

      <hr />



      <table>
        <tr>
          <td>
            <h3 style="text-align: left;"><asp:Literal ID="Literal1" runat="server">New user? Please carefully fill in these 5 fields then click "Register". </asp:Literal></h3>
          </td>
          <td>
            <h3 style="text-align: left;"><asp:Literal ID="Literal2" runat="server">Already registered? Please carefully fill in these 2 fields then click "Sign In"</asp:Literal></h3>
          </td>
        </tr>

        <tr>
          <td>
            <label>
              <asp:Literal ID="cfibId" runat="server">CFIB Member Id: (ie 01234567)</asp:Literal></label>
            <div style="padding-left: 20px; width: 300px;">
              <asp:TextBox runat="server" ID="txtCfibId" Width="250px"></asp:TextBox>
            </div>
            <label>
              <asp:Literal ID="membEmail1" runat="server">Email Address: (unique identifier)</asp:Literal></label>
            <div style="padding-left: 20px; width: 300px;">
              <asp:TextBox runat="server" ID="txtMembEmail1" Width="250px"></asp:TextBox>
            </div>
            <label>
              <asp:Literal ID="membPassword1" runat="server">Password: (you can change later)</asp:Literal></label>
            <div style="padding-left: 20px; width: 300px;">
              <asp:TextBox runat="server" ID="txtMembPassword1" TextMode="Password" Width="250px"></asp:TextBox>
            </div>
            <label>
              <asp:Literal ID="membFirstName" runat="server">First Name: (for learner reports, etc)</asp:Literal></label>
            <div style="padding-left: 20px; width: 300px;">
              <asp:TextBox runat="server" ID="txtMembFirstName" Width="250px"></asp:TextBox>
            </div>
            <label>
              <asp:Literal ID="membLastName" runat="server">Last Name: (for learner reports, etc)</asp:Literal></label>
            <div style="padding-left: 20px; width: 300px;">
              <asp:TextBox runat="server" ID="txtMembLastName" Width="250px"></asp:TextBox>
            </div>
            <div class="icons" style="padding: 10px 0 0 110px; width: 250px;">
              <asp:Button
                ID="register" runat="server"
                OnClick="register_Click"
                Text="Register" />
            </div>
          </td>
          <td>
            <label>
              <asp:Literal ID="membEmail2" runat="server">Email Address:</asp:Literal></label>
            <div style="padding-left: 20px; width: 300px;">
              <asp:TextBox runat="server" ID="txtMembEmail2" Width="250px"></asp:TextBox>
            </div>
            <label>
              <asp:Literal ID="membPassword" runat="server">Password:</asp:Literal></label>
            <div style="padding-left: 20px; width: 300px;">
              <asp:TextBox runat="server" ID="txtMembPassword2" TextMode="Password" Width="250px"></asp:TextBox>
            </div>
            <div class="icons" style="padding: 10px 0 0 110px; width: 250px;">
              <asp:Button
                ID="signIn" runat="server"
                OnClick="signIn_Click"
                Text="Sign In" />
            </div>
          </td>
        </tr>
      </table>

      <div class="c3" style="margin-top: 50px; padding-top: 20px; text-align: center; border-top: 1px solid red;">
        <asp:Literal ID="support" runat="server">Need help? Contact us at <a href='mailto:support@vubiz.com'>support@vubiz.com</a>.</asp:Literal>

        <p style="text-align: center;">
          <a style="text-decoration: none; color: antiquewhite" href="#" onclick="$('.debug').show()">1    <a style="text-decoration: none; color: antiquewhite" href="#" onclick="$('.debug').hide()">0</a>
        </p>

      </div>

    </div>

  </form>
</body>
</html>

<%@ Page
  Language="C#"
  AutoEventWireup="true"
  CodeBehind="ibaoSignUp.aspx.cs"
  Inherits="vubiz.apps.IBAOsignUp" %>

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

  <link href='styles/skins/ibao.css' rel='stylesheet' />
  <link href='styles/skins/ibao.less' type='text/css' rel='stylesheet/less' />
  <script src='scripts/less-1.5.1.min.js'></script>

  <style>
    th { width: 40%; }
    td { width: 60%; }
  </style>

  <script>

    function validate() {

      if ($("#_membFirstName")[0] != undefined) {
        if ($("#_membFirstName")[0].value.length == 0) {
          alert("Please enter your First Name.");
          return false;
        };
      };

      if ($("#_membLastName")[0] != undefined) {
        if ($("#_membLastName").val().length == 0) {
          alert("Please enter your Last Name.");
          return false;
        };
      };

      if ($("#_membEmail")[0] != undefined) {
        if ($("#_membEmail").val().length == 0) {
          alert("Please enter your Email Address.");
          return false;
        };
      };

      aspnetForm.target = '_self';
    }

  </script>


</head>


<body class="ui-mini">

  <form id="aspnetForm" runat="server">

    <div style="margin: 20px;">

      <div id="ele_$$_logo" class="noPhone" style="float: right;">
        <asp:Image ID="logo" runat="server" ImageUrl="~/styles/logos/ibao.png" />
      </div>

      <p class="c1">My Insurance Campus</p>

      <asp:Panel ID="statusPanel" runat="server" Style="margin: 50px auto; padding: 20px; max-width: 80%; width: 500px; border: 5px solid orange; border-radius: 5px; font-size: 1.3em; color: orange; text-align: left;">
        <asp:Literal ID="statusMessage" runat="server"></asp:Literal>
      </asp:Panel>

      <asp:Table ID="campusTable" runat="server" Width="400px">

        <asp:TableRow>
          <asp:TableHeaderCell>First Name : </asp:TableHeaderCell>
          <asp:TableCell>
            <asp:TextBox runat="server" ID="_membFirstName"></asp:TextBox>
            <asp:Literal runat="server" ID="__membFirstName"></asp:Literal>
          </asp:TableCell>
        </asp:TableRow>

        <asp:TableRow>
          <asp:TableHeaderCell>Last Name : </asp:TableHeaderCell>
          <asp:TableCell>
            <asp:TextBox runat="server" ID="_membLastName"></asp:TextBox>
            <asp:Literal runat="server" ID="__membLastName"></asp:Literal>
          </asp:TableCell>
        </asp:TableRow>

        <asp:TableRow>
          <asp:TableHeaderCell>Email Address : </asp:TableHeaderCell>
          <asp:TableCell>
            <asp:TextBox runat="server" ID="_membEmail"></asp:TextBox>
            <asp:Literal runat="server" ID="__membEmail"></asp:Literal>
          </asp:TableCell>
        </asp:TableRow>

        <asp:TableRow>
          <asp:TableCell ColumnSpan="2" HorizontalAlign="Center">
            <div class="icons" style="padding: 10px 0 0 150px; width: 190px;">
              <asp:Button
                ID="enroll" runat="server"
                OnClientClick="return validate(); "
                OnClick="click_enroll"
                Text="Enter the Campus" />
            </div>
          </asp:TableCell>
        </asp:TableRow>

      </asp:Table>

      <asp:HiddenField runat="server" ID="___custGuid"></asp:HiddenField>
      <asp:HiddenField runat="server" ID="___membId"></asp:HiddenField>

      <asp:HiddenField runat="server" ID="___membFirstName"></asp:HiddenField>
      <asp:HiddenField runat="server" ID="___membLastName"></asp:HiddenField>
      <asp:HiddenField runat="server" ID="___membEmail"></asp:HiddenField>

      <div class="c3" style="margin-top: 50px; padding-top: 20px; text-align: center; border-top: 1px solid orange;">
        <asp:Literal ID="support" runat="server">Need help? Contact us at <a href='mailto:support@vubiz.com'>support@vubiz.com</a>.</asp:Literal>
      </div>

    </div>


  </form>

  <script>

  </script>

</body>
</html>

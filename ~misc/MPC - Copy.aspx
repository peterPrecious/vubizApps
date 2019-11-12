<%@ Page
  Language="C#"
  AutoEventWireup="true"
  CodeBehind="MPC.aspx.cs"
  Inherits="vubiz.apps.MPC" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
  <title>MPC SignIn</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>

  <link href="//vubiz.com/vubizApps/styles/basic.css" rel="stylesheet" />
  <link href="//vubiz.com/vubizApps/styles/icons.css" rel="stylesheet" />

  <style>
    img { height: 100px; }
    table { margin: auto; }
    th { width: 60%; }
    td { width: 40%; }
  </style>

</head>
<body class="ui-mini">
  <form id="aspnetForm" runat="server">

    <div style="margin: 20px;">

      <div style="text-align: center;">
        <asp:Image runat="server" ImageUrl="~/styles/logos/mpc.png" />
      </div>

      <h1>Mortgage Professionals Canada<br />
      </h1>
      <h3>Access Simulator</h3>

      <asp:Panel ID="panel" HorizontalAlign="Center" runat="server" Style="margin: 30px auto; padding: 20px; max-width: 80%; width: 500px; border: 2px solid red; border-radius: 2px; font-size: 1em; color: red;">
        <asp:Literal ID="status" runat="server"></asp:Literal>
      </asp:Panel>

      <asp:Table ID="campusTable" runat="server" Width="500px">

        <asp:TableRow>
          <asp:TableHeaderCell>Simulator Id : </asp:TableHeaderCell>
          <asp:TableCell>
            <asp:TextBox runat="server" ID="simulator" xTextMode="Password" Text="mpcbackdoor"></asp:TextBox>
          </asp:TableCell>
        </asp:TableRow>

        <asp:TableRow>
          <asp:TableHeaderCell>Campus Guid : </asp:TableHeaderCell>
          <asp:TableCell>
            <asp:TextBox runat="server" ID="custGuid" xTextMode="Password" Text="35C720C1-BAF6-44D4-BC11-855A0C4B4919" Width="350px"></asp:TextBox>
          </asp:TableCell>
        </asp:TableRow>

        <asp:TableRow>
          <asp:TableHeaderCell>MPC No : </asp:TableHeaderCell>
          <asp:TableCell>
            <asp:TextBox runat="server" ID="membId" Text="72466"></asp:TextBox>
          </asp:TableCell>
        </asp:TableRow>

        <asp:TableRow>
          <asp:TableHeaderCell>&ensp;</asp:TableHeaderCell>
          <asp:TableCell>
            <asp:Button ID="enroll" runat="server" Text="Enter the MPC Campus" OnClick="enroll_click" /><br />
          </asp:TableCell>
        </asp:TableRow>

      </asp:Table>

    </div>


  </form>
</body>
</html>

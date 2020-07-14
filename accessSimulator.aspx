<%@ Page
  Language="C#"
  AutoEventWireup="true"
  CodeBehind="accessSimulator.aspx.cs"
  Inherits="vubiz.apps.accessSimulator" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
  <title>Access Simulator</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 0.95em; }
    h2 { font-size: 1.1em; }
    .c3 { font-size: 1.0em; }
    img { height: 100px; }
    form, table { margin: auto; width: 800px; }
    th { text-align: right; }
  </style>

</head>
<body>
  <form id="aspnetForm" runat="server">

    <asp:Panel ID="panel" HorizontalAlign="Center" runat="server" Style="margin: 30px auto; padding: 20px; max-width: 80%; width: 500px; border: 2px solid red; border-radius: 2px; font-size: 1em; color: red;">
      <asp:Literal ID="status" runat="server"></asp:Literal>
    </asp:Panel>

    <asp:Panel ID="container" runat="server" Visible="false">

      <div style="text-align: center;">
        <asp:Image ID="custLogo" runat="server" />
      </div>

      <h2><asp:Literal ID="title" runat="server"></asp:Literal>: Access Simulator</h2>

      <ul>
        <li>For testing, use on our corporate server :<br /><asp:Literal ID="launch" runat="server"></asp:Literal>.</li>
        <li>With a valid simulatorId and custGuid (both provided by Vubiz) this is a two step process.</li>
        <li>First fill in the valid fields, then call the web service passing using all these fields. </li>
        <li>If auto-enroll, the WS will add the learner if new otherwise it will update the learner. </li>
        <li>If successful, it will then return a learner GUID (membGuid).</li>
        <li>Next with that learner GUID you redirect the learner to the V8 service.</li>
        <li>The Post button below will demonstrate access.</li>
        <li>Specifications: <a target="_blank" href="http://corporate.vubiz.com/vubizWs/v8server.asmx?op=autoEnrollWs">http://corporate.vubiz.com/vubizWs/v8server.asmx?op=autoEnrollWs</a></li>
      </ul>

      <asp:Table ID="campusTable" runat="server">
        <asp:TableRow>
          <asp:TableCell ColumnSpan="3"><hr /></asp:TableCell>
        </asp:TableRow>

        <asp:TableRow>
          <asp:TableHeaderCell>simulatorId : </asp:TableHeaderCell>
          <asp:TableCell>
            <asp:TextBox runat="server" ID="simulatorId" xTextMode="Password" Text="high-backdoor"></asp:TextBox>
          </asp:TableCell>
          <asp:TableCell>...assigned by Vubiz for this service only</asp:TableCell>
        </asp:TableRow>

        <asp:TableRow>
          <asp:TableCell ColumnSpan="3"><hr /></asp:TableCell>
        </asp:TableRow>

        <asp:TableRow>
          <asp:TableHeaderCell>custGuid : </asp:TableHeaderCell>
          <asp:TableCell>
            <asp:TextBox runat="server" ID="custGuid" xTextMode="Password" Text="9ab57bde-472d-428b-9502-9363f784172a" Width="250px"></asp:TextBox>
          </asp:TableCell>
          <asp:TableCell>...assigned by Vubiz</asp:TableCell>
        </asp:TableRow>

        <asp:TableRow>
          <asp:TableCell ColumnSpan="3"><hr /></asp:TableCell>
        </asp:TableRow>

        <asp:TableRow>
          <asp:TableHeaderCell>membId : </asp:TableHeaderCell>
          <asp:TableCell>
            <asp:TextBox runat="server" ID="membId" Text="304521"></asp:TextBox>
          </asp:TableCell>
          <asp:TableCell>...unique identifier / not updateable</asp:TableCell>
        </asp:TableRow>

        <asp:TableRow>
          <asp:TableHeaderCell>membFirstName : </asp:TableHeaderCell>
          <asp:TableCell>
            <asp:TextBox runat="server" ID="membFirstName" Text="Joseph"></asp:TextBox>
          </asp:TableCell>
          <asp:TableCell>...mandatory / updateable</asp:TableCell>
        </asp:TableRow>

        <asp:TableRow>
          <asp:TableHeaderCell>membLastName : </asp:TableHeaderCell>
          <asp:TableCell>
            <asp:TextBox runat="server" ID="membLastName" Text="Blow"></asp:TextBox>
          </asp:TableCell>
          <asp:TableCell>...mandatory / updateable</asp:TableCell>
        </asp:TableRow>

        <asp:TableRow>
          <asp:TableHeaderCell>membEmail : </asp:TableHeaderCell>
          <asp:TableCell>
            <asp:TextBox runat="server" ID="membEmail" Text="j.blow@myco.com" Width="250px"></asp:TextBox>
          </asp:TableCell>
          <asp:TableCell>...mandatory / updateable</asp:TableCell>
        </asp:TableRow>

        <asp:TableRow ID="rowMembPrograms">
          <asp:TableHeaderCell>membPrograms : </asp:TableHeaderCell>
          <asp:TableCell>
            <asp:TextBox runat="server" ID="membPrograms" Text="P2263EN P3038EN" Width="250px"></asp:TextBox>
          </asp:TableCell>
          <asp:TableCell>...mandatory / updateable</asp:TableCell>
        </asp:TableRow>

        <asp:TableRow>
          <asp:TableHeaderCell>membMemo : </asp:TableHeaderCell>
          <asp:TableCell>
            <asp:TextBox runat="server" ID="membMemo" Text="" Width="250px"></asp:TextBox>
          </asp:TableCell>
          <asp:TableCell>...optional / updateable if present</asp:TableCell>
        </asp:TableRow>

        <asp:TableRow>
          <asp:TableHeaderCell>membActive : </asp:TableHeaderCell>
          <asp:TableCell>
            <asp:TextBox runat="server" ID="membActive" MaxLength="1" Text="1" Width="10px"></asp:TextBox>
          </asp:TableCell>
          <asp:TableCell>...mandatory / 1:active, 0:inactive</asp:TableCell>
        </asp:TableRow>

        <asp:TableRow>
          <asp:TableCell ColumnSpan="3"><hr /></asp:TableCell>
        </asp:TableRow>

        <asp:TableRow>
          <asp:TableCell ColumnSpan="3" HorizontalAlign="Center">
            <asp:Button Width="200px" ID="enroll" runat="server" Text="Auto-Enroll & Launch" OnClick="enroll_click" />
          </asp:TableCell>
        </asp:TableRow>

      </asp:Table>

    </asp:Panel>

  </form>
</body>
</html>

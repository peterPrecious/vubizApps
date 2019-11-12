<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="countryCodes.aspx.cs" Inherits="vubiz.apps.countryCodes" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
      <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:appsConnectionString %>" SelectCommand="sp5countryCodes" SelectCommandType="StoredProcedure">
        <SelectParameters>
          <asp:Parameter DefaultValue="*" Name="parm" Type="String" />
        </SelectParameters>
      </asp:SqlDataSource>
      <asp:DropDownList ID="DropDownList1" runat="server" DataSourceID="SqlDataSource1" DataTextField="country" DataValueField="char2">
      </asp:DropDownList>
    </div>
    </form>
</body>
</html>

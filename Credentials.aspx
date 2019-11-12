<%@ Page
  Language="C#"
  AutoEventWireup="true"
  CodeBehind="Credentials.aspx.cs"
  Inherits="vubiz.apps.credentials" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
  <title>CFIB-FCEI Credentials for Learning Centre</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />


<%--  <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>--%>

  <script src="scripts/jquery.min.js"></script>

  <link href="styles/basic.min.css" rel="stylesheet" />
  <link href="styles/icons.min.css" rel="stylesheet" />
  <style>
    h1 { font-size: 1.2em; color: #00a2f9; }
    h2 { font-size: 1.1em; }
    h3 { font-size: 1.0em; color: #006093; }
    h1, h2, h3 { text-align: left; }

    table { max-width: 1000px; margin: auto; }

    td { vertical-align: top; padding: 0 5px; }
      td:first-child { border-right: 1px solid red; border-left: 1px solid red; }
      td:last-child { border-right: 1px solid red; }

    input:not(button) { height: 22px; border-radius: 4px; }
    input[type="submit"] { height: 30px; padding: 0 40px; }

    .panStatus { margin: 25px auto; padding: 20px; width: 80%; height: 80px; border-bottom: 2px solid red; font-size: 1.1em; color: red; text-align: center; }

    .buttonx { display: block; height: 25px; width: 200px; background-color: #f2f2f2; border: none; border: 1px solid lightgrey; border-right: 1px solid grey; border-bottom: 1px solid grey; box-shadow: 2px 3px 5px darkgray; border-radius: 0; text-align: center; text-decoration: none; padding-top: 7px; padding-bottom: 0px; color: black; font-weight: bold; }
      .buttonx:hover { color: red; background-color: white; }

    /* FF does not highlight/outline a button when accessed via JS, so this does it (for all browsers) */
    input, a { margin: 5px 1px 3px 0px; border: 1px solid rgba(81, 203, 238, 1); }
      input:focus, a:focus { box-shadow: 0 0 5px grey; }
      input:not(focus), a:not(focus) { box-shadow: 0 0 5px white; }
  </style>
  <script src="scripts/$urls.min.js"></script>
  <script src="scripts/$formManagerAsp.min.js"></script>
  <script>
    $(function () {
      // set tabIndexes for ALL input items and anchors (for linkbuttons)
      var tabIndex = 0;
      $("#inputElements").find(":input, a").each(function () { tabIndex++; $(this).attr("tabindex", tabIndex); });

      // depending on the section, getFormElements from that section
      $("#txtCfibId").focus(function () { getFormElements("registerSection"); }) // start register section
      $("#txtMembEmail2").focus(function () { getFormElements("signInSection"); }) // start sigin section  

      // put this last, gets ball rolling:
      if ($.getUrlVar("section") === "signInSection") {
        $("#txtMembEmail2").focus();
      } else {
        $("#txtCfibId").focus();
      }

    })
  </script>
</head>

<body class="ui-mini">

  <form id="aspnetForm" runat="server">

    <div style="background-color: white; margin: 15px; padding: 15px; border-radius: 0.25em;">

      <div id="ele_$$_logo" class="noPhone" style="float: right;">
        <asp:Image ID="logo" runat="server" />
      </div>
      <h1>
        <asp:Literal ID="litHeader" runat="server">Authentication Service for CFIB Members and their Employees to access the CFIB Learning Centre</asp:Literal>
      </h1>

      <asp:Panel CssClass="panStatus" runat="server" Visible="false" ID="panStatus">
        <asp:Literal ID="litError" runat="server"></asp:Literal>
      </asp:Panel>

      <br />
      <br />
      <br />

      <div id="inputElements">
        <table>
          <tr>
            <%--            <td colspan="2" style="font-weight: bold; font-style: italic; padding-bottom: 30px;">
              <asp:Literal ID="litNotice" runat="server">
						As of December 1, 2018 the transition to WHMIS 2015 will be complete. If you are still taking the current WHMIS 1988 and 2015 Combines course please complete it prior to November 30th. As of Friday, November 30th there will be a new course titled WHMIS 2015 – An Overview available in the Learning Centre.
              </asp:Literal><hr />
            </td>--%>
          </tr>
          <tr>
            <td>
              <h3 style="text-align: left; margin-top: 0; margin-bottom: 30px;">
                <asp:Literal ID="litRegister" runat="server">Create an account for your company. Only one CFIB member can register per company.</asp:Literal>&nbsp;
							<asp:Literal ID="litWarning" runat="server">All fields are mandatory.</asp:Literal>
              </h3>
            </td>
            <td>
              <h3 style="text-align: left; margin-top: 0; margin-bottom: 30px;">
                <asp:Literal ID="litSignIn" runat="server">Already registered? Enter your Email and Password then click Sign In.</asp:Literal></h3>
            </td>
          </tr>
          <tr>
            <td>
              <div id="registerSection">

                <label><asp:Literal ID="cfibId" runat="server">CFIB Member Id: (ie 01234567)</asp:Literal></label>
                <div style="padding-left: 20px; padding-bottom: 10px; width: 300px;">
                  <asp:TextBox runat="server" ID="txtCfibId" Width="250px"></asp:TextBox>
                </div>



                <label><asp:Literal ID="companyName" runat="server">CFIB Member Company Name:</asp:Literal></label>
                <div style="padding-left: 20px; padding-bottom: 10px; width: 300px;">
                  <asp:TextBox runat="server" ID="txtCompanyName" Width="250px"></asp:TextBox>
                </div>

                <label><asp:Literal ID="companyPhoneNumber" runat="server">CFIB Member Phone Number:</asp:Literal></label>
                <div style="padding-left: 20px; padding-bottom: 10px; width: 300px;">
                  <asp:TextBox runat="server" ID="txtCmpanyPhoneNumber" Width="250px"></asp:TextBox>
                </div>

                <label><asp:Literal ID="companyPostalCode" runat="server">CFIB Member Postal Code:</asp:Literal></label>
                <div style="padding-left: 20px; padding-bottom: 10px; width: 300px;">
                  <asp:TextBox runat="server" ID="txtCompanyPostalCode" Width="250px"></asp:TextBox>
                </div>


                <label>
                  <asp:Literal ID="email1" runat="server">Email Address: (unique identifier)</asp:Literal></label>
                <div style="padding-left: 20px; padding-bottom: 10px; width: 300px;">
                  <asp:TextBox runat="server" ID="txtMembEmail1" Width="250px"></asp:TextBox>
                </div>
                <label>
                  <asp:Literal ID="password1" runat="server">Password: (you can change later)</asp:Literal></label>
                <div style="padding-left: 20px; padding-bottom: 10px; width: 300px;">
                  <asp:TextBox runat="server" ID="txtMembPassword1" Width="250px"></asp:TextBox>
                </div>
                <label>
                  <asp:Literal ID="firstName" runat="server">First Name:</asp:Literal></label>
                <div style="padding-left: 20px; padding-bottom: 10px; width: 300px;">
                  <asp:TextBox runat="server" ID="txtMembFirstName" Width="250px"></asp:TextBox>
                </div>
                <label>
                  <asp:Literal ID="lastName" runat="server">Last Name:</asp:Literal></label>
                <div style="padding-left: 20px; width: 300px;">
                  <asp:TextBox runat="server" ID="txtMembLastName" Width="250px"></asp:TextBox>
                </div>




                <div class="icons" style="padding: 10px 0 0 110px; width: 250px;">
                  <asp:LinkButton
                    ID="register"
                    PostBackUrl="?section=registerSection"
                    OnClick="register_Click"
                    CssClass="buttonx"
                    Text="Register"
                    runat="server"></asp:LinkButton>
                  <%--type="input"--%>
                </div>
              </div>
            </td>
            <td>

              <div id="signInSection">
                <label>
                  <asp:Literal ID="email2" runat="server">Email Address:</asp:Literal></label>
                <div style="padding-left: 20px; padding-bottom: 10px; width: 300px;">
                  <asp:TextBox runat="server" ID="txtMembEmail2" Width="250px"></asp:TextBox>
                </div>
                <label>
                  <asp:Literal ID="password2" runat="server">Password:</asp:Literal></label>
                <div style="padding-left: 20px; width: 300px;">
                  <asp:TextBox runat="server" ID="txtMembPassword2" TextMode="Password" Width="250px"></asp:TextBox>
                </div>
                <div class="icons" style="padding: 10px 0 0 110px; width: 250px;">
                  <asp:LinkButton
                    OnCommand="signIn_Click"
                    ID="signIn"
                    CssClass="buttonx"
                    PostBackUrl="?section=signInSection"
                    runat="server">Sign In</asp:LinkButton>
                </div>
              </div>
              <div id="retrievePasswordSection">
                <hr style="margin: 50px 0;" />
                <h3 style="text-align: left;">
                  <asp:Literal ID="litPassword" runat="server">Forgot password</asp:Literal>?</h3>
                <div class="icons" style="padding: 10px 0 0 110px; width: 250px;">
                  <asp:Button
                    runat="server"
                    ID="password"
                    CssClass="buttonx"
                    OnClick="password_Click"
                    Text="Retrieve" />
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>


      <div class="c3" style="margin-top: 50px; padding-top: 20px; text-align: center;">
        <asp:Literal ID="support" runat="server">Need help? Contact us at </asp:Literal><a target="_blank" href='http://onlinelearninghelp.com/Main/frmTickets.aspx'>http://onlinelearninghelp.com</a>.
      </div>

    </div>
  </form>

</body>
</html>

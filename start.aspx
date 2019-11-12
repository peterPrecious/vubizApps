<%@ Page 
  Language="C#" 
  AutoEventWireup="true" 
  CodeBehind="start.aspx.cs" 
  Inherits="vubiz.apps.start" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
  <title>Security Check</title>
  <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
  <script>
    var next = "/v8";
    try {
      $(function () {
        $.getJSON("/vubizWs/v8client.asmx/browserCheck", {})
          .done(function (data) {
            //alert(data.browserNo);
            location.href = next + location.search;
          })
          .fail(function (jqxhr, textStatus, error) { // alert(textStatus + ":" + error);
          });
      })
    } catch (err) {
      alert(err);
    }

  </script>
  <style>
    @keyframes warning {
      from { border-color: white; color: white; }
      to { border-color: red; color: black; }
    }
    #alert { width: 50%; min-width: 300px; padding: 20px; margin: 50px auto; border: 5px solid red; animation-name: warning; animation-duration: 8s; }
    hr { border: 1px solid red; animation-name: warning; animation-duration: 8s; }
  </style>
</head>
<body>
  <form id="form1" runat="server">
  <div id="alert">
    Your current security settings are blocking this app.<br />Suggestions:
    <ul>
      <li>use your browser's default security settings</li>
      <li>do NOT use IE Protected Mode</li>
      <li>ensure you ALLOW popups</li>
    </ul>
    <hr />
    Vos paramètres de sécurité actuels bloquent ce soft. <br />Suggestions:
    <ul>
      <li>utiliser les paramètres de sécurité par défaut de votre navigateur</li>
      <li>ne pas utiliser IE mode protégé</li>
      <li>assurez-vous permettre popups</li>
    </ul>
  </div>
  </form>
</body>
</html>

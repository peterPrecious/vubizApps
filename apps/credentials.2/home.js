var $var_$$_initialized = false;

$(document).bind("pagebeforeshow", function () {
	if ($.mobile.activePage.attr("id") === "page_$$") {
		$("#footer_$$_title").html($vc.sessionState.appId + " | $$");

		if (!$var_$$_initialized) {
			$var_$$_initialized = true;
			$vc.sessionState.debug = true;
			$vc.$$.initGUI();
		}
	}
});

$vc.$$ = function () {
	var _doneEmail = function (data, result, xhr) {
		if (data.status === "err") {
			$vc.fn.console("Error running email");
			$vc.fn.popup("[[The Email Service was unable to email your password.<br /><br />Please notify support@vubiz.com!]]");
		} else {
			$vc.fn.console("Success running email");
			$vc.fn.popup("[[Your password has been emailed.]]");
		}
	};
	var _failEmail = function (xhr, result, statusText) {
		$vc.fn.console("Failed running email");
		$vc.fn.popup("[[The Email Service was unable to email your password.<br /><br />Please notify support@vubiz.com!]]");
	};
	var _donePwd = function (data, result, xhr) {
		$vc.fn.console("Success running v8password");
		if (data === undefined || data === null) {
			$vc.fn.popup("[[We were unable to run the service that retrieves your credentials.<br /><br />Please notify support@vubiz.com!]]");
		} else if (data.email === "" || data.password === "") {
			$vc.fn.popup("[[Your Username or Email Address is either invalid or is not associated with an active learner.]]");
		} else {
			var parm = {};
			//parm.emailFrom = $vc.profileState.emailFrom;
			parm.emailFrom = "noreply@vubiz.com";
			parm.emailTo = data.email;
			parm.emailSubject = "[[Your Password]]";
			parm.emailBody = "[[Password]]" + " : " + data.password;
			$vc.ws("email", parm, _doneEmail, _failEmail);
		}
	};
	var _failPwd = function (xhr, result, statusText) {
		$vc.fn.popup("[[We were unable to run the service that retrieves your credentials.<br /><br />Please notify support@vubiz.com!]]");
	};

  return {
    getPwd: function () {
      $vc.sessionState.uniqueId = $("#ele_$$_uniqueId").val();
      if ($vc.sessionState.uniqueId.length < 4) {
        $vc.fn.popup("[[Please enter a valid Username or Email.]]");
      } else {
        $vc.fn.popup("[[We are calling up the Credentials Service. This should just take a minute.]]");
        var parm = {};
        parm.custId = $vc.sessionState.custId;
        parm.uniqueId = $vc.sessionState.uniqueId;
        $vc.ws("v8password", parm, _donePwd, _failPwd);
      }
    },
    initGUI: function () {
      $("#ele_$$_homeIcon").hide();
      $("#ele_$$_backIcon").hide();
      $("#ele_$$_videoIcon").hide();

      // get logo from profile (ensure exists in logos.css)
      if ($vc.sessionState.profile.length > 0) $("#ele_$$_logo").addClass($vc.sessionState.profile);

      // CFIB currently coming from /credentials.aspx so do not add another help link
      if ($vc.sessionState.profile === "cfib" || $vc.sessionState.profile === "fcei") {
        $("#ele_$$_contactUs").hide();
      } else {
        var link = $vc.profileState.emailFrom;
        if (link.length > 0) {
          if (link.indexOf("@") > -1) {
            link = "<a id='ele_$$_emailFrom' href='mailto:" + link + "'>" + link + "</a>";
          } else {
            link = "<a id='ele_$$_emailFrom' target='_blank' href='" + link + "'>" + link + "</a>";
          }
        }
        $("#ele_$$_contactUs").append(link);
      }
    }
  };
}();

$(function () {
  $("#ele_$$_search").on("click", function (event) { $vc.$$.getPwd(); });
});
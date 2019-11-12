using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ibaoTest
{
  public class IbaoEnroll
  {
    public string msgId { get; set; }
    public string membGuid { get; set; }
    public string membNOPGuid { get; set; }
  }

  public class IbaoMember
  {
    public string membEmail { get; set; }
    public string membFirstName { get; set; }
    public string membLastName { get; set; }
    public string custGuid { get; set; }
    public string membGuid { get; set; }
    public string membNOPGuid { get; set; }
  }
}
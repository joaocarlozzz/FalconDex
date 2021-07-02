using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Pages_Techs_MasterPage : System.Web.UI.MasterPage
{
    public void changeTitle()
    {
        lblTitle.Text = this.Page.Title;
        lblTtile2.Text = this.Page.Title;
    }
    protected void Page_Load(object sender, EventArgs e)
    {
        changeTitle();
    }
}

using falconDex.Controller;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Tecnicos : System.Web.UI.Page
{
    private void Carrega()
    {
        UsuarioController usuarioController = new UsuarioController();
        DataSet dataSet = usuarioController.selectAll();
        RepeaterUsers.DataSource = dataSet.Tables[0].DefaultView;
        RepeaterUsers.DataBind();
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        Carrega();
    }
}
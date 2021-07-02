using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;

/// <summary>
/// Summary description for Global
/// </summary>
/// 
public class Global : HttpApplication
{

    void Application_Start(object sender, EventArgs e)
    {
        RouteTable.Routes.MapHttpRoute(
            name: "DefaultApi",
            routeTemplate: "api/{controller}/{id}",
            defaults: new { id = System.Web.Http.RouteParameter.Optional}
        );
    }
}
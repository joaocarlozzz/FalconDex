using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Web;
using System.Web.Http;

/// <summary>
/// Descrição resumida de WebApiConfig
/// </summary>
public class WebApiConfig
{
    public static void Register(HttpConfiguration conf)
    {
        conf.Routes.MapHttpRoute(
            name: "FalconDex",
            routeTemplate: "api/{controller}/{id}",
            defaults: new {id = RouteParameter.Optional}
         );
    }
}
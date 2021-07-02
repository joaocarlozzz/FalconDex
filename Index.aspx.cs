using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.UI;

using falconDex.Controller;
using falconDex.Models;
//using Microsoft.Net.Http.Headers;

namespace falconDex
{
    public partial class Index : System.Web.UI.Page
    {

        protected void Page_Load(object sender, EventArgs e)
        {
            //var cookieHeader = Request.Headers.GetCookies("session-id").FirstOrDefault();
            var response = HttpContext.Current.Response;
            var session = response.Cookies.Get("session-id");

            if (session == null) {
                //Response.Redirect(session.Values["permissao"])
                Response.Write("erro no cookie");
            }
            else if(!string.IsNullOrEmpty(session.Value))
            {
                string cookie = session.Value;

                if (cookie == "3" || cookie == "2")
                {
                    Response.Redirect("/inicio");
                }
                else if (cookie == "1")
                {
                    Response.Redirect("/chamados");
                }

            }

        }

        protected void btnEntrar_Click(object sender, EventArgs e)
        {
            LoginController loginController = new LoginController();
            Login login = new Login
            {
                Email = txtEmail.Text,
                Senha = txtSenha.Text
            };


            DateTime dateValue = DateTime.Now;
            login.Date = dateValue;

            login.Ip = GetUserIP();

            //int status = 0;
            Boolean status = loginController.login(login);

            if (status == true)
            {
                int permissao = loginController.getPermissao(login).First();

                if(permissao == 3 || permissao == 2)
                {
                    Response.Redirect("/inicio");
                }
                else
                {
                    Response.Redirect("/chamados");
                }

                HttpCookie sessionId = new HttpCookie("session-id");

                Session["permissao"] = "" + permissao;

                var response = HttpContext.Current.Response;

                //Add key-values in the cookie
                sessionId.Value = Session["permissao"].ToString();
                //sessionId.Values.Add("permissao", "" + permissao);

                //set cookie expiry date-time. Made it to last for next 12 hours.
                sessionId.Expires = DateTime.Now.AddHours(12);

                sessionId.HttpOnly = true;

                //Most important, write the cookie to client.
                response.Cookies.Add(sessionId);
            }
            else
            {
                lblMessage.Text = "Dados incorretos";
            }
        }

        private string GetUserIP()
        {
            string ipList = Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

            if (!string.IsNullOrEmpty(ipList))
            {
                return ipList.Split(',')[0];
            }

            return Request.ServerVariables["REMOTE_ADDR"];
        }
    }
}
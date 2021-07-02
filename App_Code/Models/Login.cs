using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descrição resumida de Class1
/// </summary>
/// 
namespace falconDex.Models
{
    public class Login
    {
        public String Email { get; set; }
        public String Senha { get; set; }
        public String Ip { get; set; }
        public DateTime Date { get; set; }

        public Login()
        {
            //
            // TODO: Adicionar lógica do construtor aqui
            //
        }
    }
}
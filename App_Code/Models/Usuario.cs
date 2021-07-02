using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descrição resumida de Class1
/// </summary>
/// 

namespace falconDex.Models {
    public class Usuario
    {
        public int Id { get; set; }
        public String Nome { get; set; }
        public String Email { get; set; }
        public String Senha { get; set; }
        public Status status { get; set; }
        public Permissao permissao { get; set; }
        public Usuario ()
        {

        }

    }

}
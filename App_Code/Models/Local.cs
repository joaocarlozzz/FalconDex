using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descrição resumida de Locais
/// </summary>
/// 
namespace falconDex.Models
{
    public class Local
    {
        public int Id { get; set; }
        public String Nome { get; set; }

        public String Bloco { get; set; }
        public Status status { get; set; }

        public Local()
        {
            //
            // TODO: Adicionar lógica do construtor aqui
            //
        }
    }

}
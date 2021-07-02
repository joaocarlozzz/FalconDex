using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descrição resumida de Permissao
/// </summary>
/// 

namespace falconDex.Models
{
    public class Permissao
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public Status status { get; set; }
        public DateTime data { get; set; }

        public Permissao()
        {
            //
            // TODO: Adicionar lógica do construtor aqui
            //
        }
    }

}
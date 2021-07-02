using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descrição resumida de Status
/// </summary>
/// 
namespace falconDex.Models
{
    public class Status
    {
        public int Id { get; set; }
        public String Nome { get; set; }
        public DateTime Dt_criacao { get; set; }

        public Status()
        {
            //
            // TODO: Adicionar lógica do construtor aqui
            //
        }
    }
}
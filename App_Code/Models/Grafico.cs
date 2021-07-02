using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descrição resumida de Grafico
/// </summary>
/// 
namespace falconDex.Models
{
    public class Grafico
    {
        public int codigo { get; set; }
        public decimal quantidade { get; set; }
        public string nome { get; set; }

        public Grafico()
        {
            //
            // TODO: Adicionar lógica do construtor aqui
            //
        }
    }
}
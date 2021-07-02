using falconDex.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descrição resumida de TipoEquipamento
/// </summary>
/// 
namespace falconDex.Models
{
    public class TipoEquipamento
    {
        public int ID { get; set; }
        public string Nome { get; set; }
        public Status Status { get; set; }
        public TipoEquipamento()
        {
            //
            // TODO: Adicionar lógica do construtor aqui
            //
        }
    }
}
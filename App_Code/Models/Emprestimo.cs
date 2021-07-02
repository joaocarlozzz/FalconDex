using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descrição resumida de Equipamento
/// </summary>
/// 
namespace falconDex.Models
{
    public class Emprestimo
    {
        public int Id { get; set; }
        public Equipamento Equipamento { get; set; }
        public Usuario Usuario { get; set; }
        public DateTime Data { get; set; }
        public Usuario Tecnico { get; set; }

        public Emprestimo()
        {
            //
            // TODO: Adicionar lógica do construtor aqui
            //
        }
    }
}
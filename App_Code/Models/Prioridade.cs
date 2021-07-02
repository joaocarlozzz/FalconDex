using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descrição resumida de Prioridade
/// </summary>
/// 
namespace falconDex.Models
{
    public class Prioridade
    {
        public int Id { get; set; }
        public String Nome { get; set; }
        public int Tempo { get; set; }
        public Status status { get; set; }

        public Prioridade()
        {
            //
            // TODO: Adicionar lógica do construtor aqui
            //
        }
    }
}
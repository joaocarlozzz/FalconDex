using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descrição resumida de Chamado
/// </summary>
/// 
namespace falconDex.Models
{
    public class Chamado
    {
        public int Id { get; set; }
        public String Nome { get; set; }
        public String Descricao { get; set; }
        public Usuario abridor { get; set; }
        public TipoEquipamento equipamento { get; set; }
        public Local Local { get; set; }
        public Usuario Responsavel { get; set; }
        public Prioridade prioridade { get; set; }
        public DateTime Data { get; set; }
        public Status status { get; set; }
        public int Feed { get; set; }

        public Chamado()
        {
            //
            // TODO: Adicionar lógica do construtor aqui
            //
        }
    }

}
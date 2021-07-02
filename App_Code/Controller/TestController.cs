using falconDex.Models;
using FATEC;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

public class TestController : ApiController
{
    // GET api/<controller>
    [HttpGet]
    public IEnumerable<Chamado> Get()
    {
        DataSet ds = new DataSet();
        DataTable dt = new DataTable();
        IDbConnection objConexao;
        IDbCommand objCommand;
        IDataAdapter objDataAdapter;
        objConexao = Mapped.Connection();
        objCommand = Mapped.Command("SELECT * FROM cha_chamado", objConexao);
        objDataAdapter = Mapped.Adapter(objCommand);
        objDataAdapter.Fill(ds);
        dt = ds.Tables[0];

        List<Chamado> data = dt.AsEnumerable()
                      .Select(r => new Chamado {
                          Id = r.Field<int>("cha_id"),
                          Nome = r.Field<string>("cha_name"),
                          Descricao = r.Field<string>("cha_descricao"),
                          Data = r.Field<DateTime>("cha_criacao"),
                          abridor = new Usuario{ 
                               Id = r.Field<Int32>("USU_ID") 
                          },
                          equipamento = new TipoEquipamento {
                              ID = r.Field<Int32>("EQU_ID")
                          },
                          Local = new Local {
                              Id = r.Field<Int32>("LOC_ID")
                          },
                          Responsavel = new Usuario {
                              Id = r.Field<Int32>("USU_RESP")
                          },
                          prioridade = new Prioridade
                          {
                              Id = r.Field<Int32>("PRI_ID")
                          },
                          status = new Status {
                              Id = r.Field<Int32>("CHA_STATUS")
                          }
                      })
                      .ToList();

        return data;
    }

    // GET api/<controller>/5
    [HttpGet]
    public IEnumerable<Chamado> Get(int id)
    {
        DataSet ds = new DataSet();
        DataTable dt = new DataTable();
        IDbConnection objConexao;
        IDbCommand objCommand;
        IDataAdapter objDataAdapter;
        objConexao = Mapped.Connection();
        objCommand = Mapped.Command("SELECT * FROM cha_chamado WHERE cha_id = ?", objConexao);
        objCommand.Parameters.Add(Mapped.Parameter("?id", id));
        objDataAdapter = Mapped.Adapter(objCommand);
        objDataAdapter.Fill(ds);
        dt = ds.Tables[0];

        List<Chamado> data = dt.AsEnumerable()
                      .Select(r => new Chamado
                      {
                          Id = r.Field<int>("cha_id"),
                          Nome = r.Field<string>("cha_name"),
                          Descricao = r.Field<string>("cha_descricao"),
                          Data = r.Field<DateTime>("cha_criacao"),
                          abridor = new Usuario
                          {
                              Id = r.Field<Int32>("USU_ID")
                          },
                          equipamento = new TipoEquipamento
                          {
                              ID = r.Field<Int32>("EQU_ID")
                          },
                          Local = new Local
                          {
                              Id = r.Field<Int32>("LOC_ID")
                          },
                          Responsavel = new Usuario
                          {
                              Id = r.Field<Int32>("USU_RESP")
                          },
                          prioridade = new Prioridade
                          {
                              Id = r.Field<Int32>("PRI_ID")
                          },
                          status = new Status
                          {
                              Id = r.Field<Int32>("CHA_STATUS")
                          }
                      })
                      .ToList();

        return data;
    }

    // POST api/<controller>
    public void Post([FromBody] Chamado value)
    {
        var response = value;

        Chamado chamado = new Chamado
        {
            Nome = response.Nome,
            Descricao = response.Descricao,
            abridor = new Usuario { Id = 1 },
            equipamento = new TipoEquipamento { ID = response.equipamento.ID },
            Local = new Local { Id = response.Local.Id },
            prioridade = new Prioridade { Id = response.prioridade.Id},
            Data = response.Data
        };

        DateTime dateValue = DateTime.Now;

        IDbConnection objConexao;
        IDbCommand objCommand;
        string sql = "INSERT INTO cha_chamado" +
            "(cha_name, cha_descricao, usu_id, equ_id, loc_id, pri_id, cha_criacao) " +
            "VALUES (?name, ?descricao, ?abridor, ?equipamento, ?local, ?prioridade, ?criacao)";
        objConexao = Mapped.Connection();
        objCommand = Mapped.Command(sql, objConexao);
        objCommand.Parameters.Add(Mapped.Parameter("?name", chamado.Nome));
        objCommand.Parameters.Add(Mapped.Parameter("?descricao", chamado.Descricao));
        objCommand.Parameters.Add(Mapped.Parameter("?abridor", "1"));
        objCommand.Parameters.Add(Mapped.Parameter("?equipamento", chamado.equipamento.ID));
        objCommand.Parameters.Add(Mapped.Parameter("?local", chamado.Local.Id));
        objCommand.Parameters.Add(Mapped.Parameter("?prioridade", chamado.prioridade.Id));
        objCommand.Parameters.Add(Mapped.Parameter("?criacao", dateValue));

        int i = objCommand.ExecuteNonQuery();
        objConexao.Close();

        objCommand.Dispose();
        objConexao.Dispose();
    }

    // PUT api/<controller>/5
    public void Put(int id, [FromBody] Chamado chamado)
    {
        System.Data.IDbConnection objConexao;
        System.Data.IDbCommand objCommand;
        string sql = "UPDATE cha_chamado SET " +
            "cha_name = ?name, cha_descricao = ?descricao, " +
            "equ_id = ?equipamento, loc_id = ?local, pri_id = ?prioridade" +
            "WHERE cha_id =? codigo";
        objConexao = Mapped.Connection();
        objCommand = Mapped.Command(sql, objConexao);
        objCommand.Parameters.Add(Mapped.Parameter("?name", chamado.Nome));
        objCommand.Parameters.Add(Mapped.Parameter("?descricao", chamado.Descricao));
        objCommand.Parameters.Add(Mapped.Parameter("?equipamento", chamado.equipamento.ID));
        objCommand.Parameters.Add(Mapped.Parameter("?local", chamado.Local.Id));
        objCommand.Parameters.Add(Mapped.Parameter("?prioridade", chamado.prioridade.Id));
        objCommand.Parameters.Add(Mapped.Parameter("?codigo", chamado.Id));
        objCommand.ExecuteNonQuery();
        objConexao.Close();
        objCommand.Dispose();
        objConexao.Dispose();
    }

    // DELETE api/<controller>/5
    public void Delete(int id)
    {
    }
}

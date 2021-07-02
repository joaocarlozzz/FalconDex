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

public class ChamadoController : ApiController
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
        objCommand = Mapped.Command("SELECT cha_id, cha_name, cha_descricao, cha_criacao, c.USU_ID ABRI_ID, EQU_ID, c.LOC_ID LOCAL_ID, USU_RESP, " +
            "c.PRI_ID PRIORI_ID, CHA_STATUS, CHA_FEED, abri.USU_NOME ABRI_NOME, resp.USU_NOME RESP_NOME, TIE_NOME, LOC_NOME, PRI_NOME, STA_NOME FROM cha_chamado c " +
            "INNER JOIN usu_usuario abri ON abri.USU_ID = c.USU_ID " +
            "INNER JOIN usu_usuario resp ON resp.USU_ID = c.USU_ID " +
            "INNER JOIN TIE_tipo_EQUIPAMENTOS tie ON tie.TIE_ID = c.EQU_ID " +
            "INNER JOIN loc_local loc ON loc.LOC_ID = c.LOC_ID " +
            "INNER JOIN PRI_PRIORIDADE pri ON pri.PRI_ID = c.PRI_ID " +
            "INNER JOIN STA_STATUS status ON status.STA_ID = c.CHA_STATUS", objConexao);
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
                              Id = r.Field<Int32>("ABRI_ID"),
                              Nome = r.Field<string>("ABRI_NOME")
                          },
                          equipamento = new TipoEquipamento
                          {
                              ID = r.Field<Int32>("EQU_ID"),
                              Nome = r.Field<string>("TIE_NOME")
                          },
                          Local = new Local
                          {
                              Id = r.Field<Int32>("LOCAL_ID"),
                              Nome = r.Field<string>("LOC_NOME")
                          },
                          Responsavel = new Usuario
                          {
                              Id = r.Field<Int32>("USU_RESP"),
                              Nome = r.Field<string>("RESP_NOME")
                          },
                          prioridade = new Prioridade
                          {
                              Id = r.Field<Int32>("PRIORI_ID"),
                              Nome = r.Field<string>("PRI_NOME")
                          },
                          status = new Status
                          {
                              Id = r.Field<Int32>("CHA_STATUS"),
                              Nome = r.Field<string>("STA_NOME")
                          },
                          Feed = r.Field<int>("CHA_FEED")
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
        objCommand = Mapped.Command("SELECT *  FROM cha_chamado WHERE cha_id = ?", objConexao);
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
                          },
                          Feed = r.Field<Int32>("CHA_FEED")
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
            abridor = new Usuario { Id = response.abridor.Id },
            equipamento = new TipoEquipamento { ID = response.equipamento.ID },
            Local = new Local { Id = response.Local.Id },
            prioridade = new Prioridade { Id = response.prioridade.Id },
            Data = response.Data,
            Feed = 0
        };

        DateTime dateValue = DateTime.Now;

        IDbConnection objConexao;
        IDbCommand objCommand;
        string sql = "INSERT INTO cha_chamado" +
            "(cha_name, cha_descricao, usu_id, equ_id, loc_id, pri_id, cha_criacao, cha_feed) " +
            "VALUES (?name, ?descricao, ?abridor, ?equipamento, ?local, ?prioridade, ?criacao, ?feed)";
        objConexao = Mapped.Connection();
        objCommand = Mapped.Command(sql, objConexao);
        objCommand.Parameters.Add(Mapped.Parameter("?name", chamado.Nome));
        objCommand.Parameters.Add(Mapped.Parameter("?descricao", chamado.Descricao));
        objCommand.Parameters.Add(Mapped.Parameter("?abridor", chamado.abridor.Id));
        objCommand.Parameters.Add(Mapped.Parameter("?equipamento", chamado.equipamento.ID));
        objCommand.Parameters.Add(Mapped.Parameter("?local", chamado.Local.Id));
        objCommand.Parameters.Add(Mapped.Parameter("?prioridade", chamado.prioridade.Id));
        objCommand.Parameters.Add(Mapped.Parameter("?feed", chamado.Feed));
        objCommand.Parameters.Add(Mapped.Parameter("?criacao", dateValue));

        int i = objCommand.ExecuteNonQuery();
        objConexao.Close();

        objCommand.Dispose();
        objConexao.Dispose();
    }

    // PUT api/<controller>/5
    public void Put(int id, [FromBody] Chamado value)
    {
        var response = value;

        Chamado chamado = new Chamado
        {
            Nome = response.Nome,
            Descricao = response.Descricao,
            abridor = new Usuario { Id = response.abridor.Id },
            equipamento = new TipoEquipamento { ID = response.equipamento.ID },
            Responsavel = new Usuario { Id = response.Responsavel.Id},
            Local = new Local { Id = response.Local.Id },
            prioridade = new Prioridade { Id = response.prioridade.Id },
            status = new Status { Id = response.status.Id },
            Feed = response.Feed
        };


        System.Data.IDbConnection objConexao;
        System.Data.IDbCommand objCommand;
        string sql = "UPDATE cha_chamado SET " +
            "cha_name = ?name, cha_descricao = ?descricao, usu_id = ?abridor, " +
            "equ_id = ?equipamento, loc_id = ?local, usu_resp = ?responsavel, pri_id = ?prioridade, cha_status = ?status, cha_feed = ?feed" +
            " WHERE cha_id = ?codigo";
        objConexao = Mapped.Connection();
        objCommand = Mapped.Command(sql, objConexao);
        objCommand.Parameters.Add(Mapped.Parameter("?codigo", id));
        objCommand.Parameters.Add(Mapped.Parameter("?name", chamado.Nome));
        objCommand.Parameters.Add(Mapped.Parameter("?descricao", chamado.Descricao));
        objCommand.Parameters.Add(Mapped.Parameter("?abridor", chamado.abridor.Id));
        objCommand.Parameters.Add(Mapped.Parameter("?equipamento", chamado.equipamento.ID));
        objCommand.Parameters.Add(Mapped.Parameter("?local", chamado.Local.Id));
        objCommand.Parameters.Add(Mapped.Parameter("?responsavel", chamado.Responsavel.Id));
        objCommand.Parameters.Add(Mapped.Parameter("?prioridade", chamado.prioridade.Id));
        objCommand.Parameters.Add(Mapped.Parameter("?status", chamado.status.Id));
        objCommand.Parameters.Add(Mapped.Parameter("?feed", chamado.Feed));
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
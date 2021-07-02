using falconDex.Models;
using FATEC;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

public class PrioridadeController : ApiController
{
    // GET api/<controller>
    public IEnumerable<Prioridade> Get()
    {
        DataSet ds = new DataSet();
        DataTable dt = new DataTable();
        IDbConnection objConexao;
        IDbCommand objCommand;
        IDataAdapter objDataAdapter;
        objConexao = Mapped.Connection();
        objCommand = Mapped.Command("SELECT * FROM PRI_PRIORIDADE", objConexao);
        objDataAdapter = Mapped.Adapter(objCommand);
        objDataAdapter.Fill(ds);
        dt = ds.Tables[0];

        List<Prioridade> data = dt.AsEnumerable()
                      .Select(r => new Prioridade
                      {
                          Id = r.Field<int>("pri_id"),
                          Nome = r.Field<string>("pri_nome"),
                          Tempo = r.Field<int>("pri_tempo"),
                          status = new Status
                          {
                              Id = r.Field<int>("pri_status"),
                          }
                      })
                      .ToList();

        return data;
    }

    // GET api/<controller>/5
    public IEnumerable<Prioridade> Get(int id)
    {
        DataSet ds = new DataSet();
        DataTable dt = new DataTable();
        IDbConnection objConexao;
        IDbCommand objCommand;
        IDataAdapter objDataAdapter;
        objConexao = Mapped.Connection();
        objCommand = Mapped.Command("SELECT * FROM PRI_PRIORIDADE where pri_id = ?", objConexao);
        objCommand.Parameters.Add(Mapped.Parameter("?id", id));
        objDataAdapter = Mapped.Adapter(objCommand);
        objDataAdapter.Fill(ds);
        dt = ds.Tables[0];

        List<Prioridade> data = dt.AsEnumerable()
                      .Select(r => new Prioridade
                      {
                          Id = r.Field<int>("pri_id"),
                          Nome = r.Field<string>("pri_nome"),
                          Tempo = r.Field<int>("pri_tempo"),
                          status = new Status
                          {
                              Id = r.Field<int>("pri_status"),
                          }
                      })
                      .ToList();

        return data;
    }

    // POST api/<controller>
    public void Post([FromBody] string value)
    {
    }

    // PUT api/<controller>/5
    public void Put(int id, [FromBody] string value)
    {
    }

    // DELETE api/<controller>/5
    public void Delete(int id)
    {
    }
}
using falconDex.Models;
using FATEC;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

public class StatusController : ApiController
{
    // GET api/<controller>
    public IEnumerable<Status> Get()
    {
        DataSet ds = new DataSet();
        DataTable dt = new DataTable();
        IDbConnection objConexao;
        IDbCommand objCommand;
        IDataAdapter objDataAdapter;
        objConexao = Mapped.Connection();
        objCommand = Mapped.Command("SELECT * FROM STA_STATUS", objConexao);
        objDataAdapter = Mapped.Adapter(objCommand);
        objDataAdapter.Fill(ds);
        dt = ds.Tables[0];

        List<Status> data = dt.AsEnumerable()
                      .Select(r => new Status
                      {
                          Id = r.Field<int>("sta_id"),
                          Nome = r.Field<string>("sta_nome"),
                          Dt_criacao = r.Field<DateTime>("sta_dt_criacao"),
                      })
                      .ToList();

        return data;
    }

    // GET api/<controller>/5
    public IEnumerable<Status> Get(int id)
    {
        DataSet ds = new DataSet();
        DataTable dt = new DataTable();
        IDbConnection objConexao;
        IDbCommand objCommand;
        IDataAdapter objDataAdapter;
        objConexao = Mapped.Connection();
        objCommand = Mapped.Command("SELECT * FROM STA_STATUS WHERE sta_id = ?", objConexao);
        objCommand.Parameters.Add(Mapped.Parameter("?id", id));
        objDataAdapter = Mapped.Adapter(objCommand);
        objDataAdapter.Fill(ds);
        dt = ds.Tables[0];

        List<Status> data = dt.AsEnumerable()
                      .Select(r => new Status
                      {
                          Id = r.Field<int>("sta_id"),
                          Nome = r.Field<string>("sta_nome"),
                          Dt_criacao = r.Field<DateTime>("sta_dt_criacao"),
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
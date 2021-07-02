using falconDex.Models;
using FATEC;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

public class PermissaoController : ApiController
{
    // GET api/<controller>
    public IEnumerable<Permissao> Get()
    {
        DataSet ds = new DataSet();
        DataTable dt = new DataTable();
        IDbConnection objConexao;
        IDbCommand objCommand;
        IDataAdapter objDataAdapter;
        objConexao = Mapped.Connection();
        objCommand = Mapped.Command("SELECT * FROM PER_PERMISSAO", objConexao);
        objDataAdapter = Mapped.Adapter(objCommand);
        objDataAdapter.Fill(ds);
        dt = ds.Tables[0];

        List<Permissao> data = dt.AsEnumerable()
                      .Select(r => new Permissao
                      {
                          Id = r.Field<int>("per_id"),
                          Nome = r.Field<string>("per_nome"),
                          status = new Status
                          {
                              Id = r.Field<int>("per_status"),
                          },
                          data = r.Field<DateTime>("per_dt_criacao")
                      })
                      .ToList();

        return data;
    }

    // GET api/<controller>/5
    public IEnumerable<Permissao> Get(int id)
    {
        DataSet ds = new DataSet();
        DataTable dt = new DataTable();
        IDbConnection objConexao;
        IDbCommand objCommand;
        IDataAdapter objDataAdapter;
        objConexao = Mapped.Connection();
        objCommand = Mapped.Command("SELECT * FROM PER_PERMISSAO WHERE per_id = ?id", objConexao);
        objCommand.Parameters.Add(Mapped.Parameter("?id", id));
        objDataAdapter = Mapped.Adapter(objCommand);
        objDataAdapter.Fill(ds);
        dt = ds.Tables[0];

        List<Permissao> data = dt.AsEnumerable()
                      .Select(r => new Permissao
                      {
                          Id = r.Field<int>("per_id"),
                          Nome = r.Field<string>("per_nome"),
                          status = new Status
                          {
                              Id = r.Field<int>("per_status"),
                          },
                          data = r.Field<DateTime>("per_dt_criacao")
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

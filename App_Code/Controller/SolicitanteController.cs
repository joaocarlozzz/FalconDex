using falconDex.Models;
using FATEC;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Http;

/// <summary>
/// Descrição resumida de SolicitanteController
/// </summary>
public class SolicitanteController : ApiController
{
    public IEnumerable<Usuario> Get()
    {
        DataSet ds = new DataSet();
        DataTable dt = new DataTable();
        IDbConnection objConexao;
        IDbCommand objCommand;
        IDataAdapter objDataAdapter;
        objConexao = Mapped.Connection();
        objCommand = Mapped.Command("SELECT * FROM usu_usuario", objConexao);
        objDataAdapter = Mapped.Adapter(objCommand);
        objDataAdapter.Fill(ds);
        dt = ds.Tables[0];

        List<Usuario> data = dt.AsEnumerable()
                      .Select(r => new Usuario
                      {
                          Id = r.Field<int>("usu_id"),
                          Nome = r.Field<string>("usu_nome")
                      })
                      .ToList();

        return data;
    }

    // GET api/<controller>/5
    public IEnumerable<Usuario> Get(int id)
    {
        DataSet ds = new DataSet();
        DataTable dt = new DataTable();
        IDbConnection objConexao;
        IDbCommand objCommand;
        IDataAdapter objDataAdapter;
        objConexao = Mapped.Connection();
        objCommand = Mapped.Command("SELECT * FROM usu_usuario WHERE usu_id = ?id", objConexao);
        objCommand.Parameters.Add(Mapped.Parameter("?id", id));
        objDataAdapter = Mapped.Adapter(objCommand);
        objDataAdapter.Fill(ds);
        dt = ds.Tables[0];

        List<Usuario> data = dt.AsEnumerable()
                      .Select(r => new Usuario
                      {
                          Id = r.Field<int>("usu_id"),
                          Nome = r.Field<string>("usu_nome")
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
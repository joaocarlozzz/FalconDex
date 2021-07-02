using falconDex.Models;
using FATEC;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

public class TipoEquipamentoController : ApiController
{
    // GET api/<controller>
    public IEnumerable<TipoEquipamento> Get()
    {
        DataSet ds = new DataSet();
        DataTable dt = new DataTable();
        IDbConnection objConexao;
        IDbCommand objCommand;
        IDataAdapter objDataAdapter;
        objConexao = Mapped.Connection();
        objCommand = Mapped.Command("SELECT * FROM TIE_tipo_EQUIPAMENTOS", objConexao);
        objDataAdapter = Mapped.Adapter(objCommand);
        objDataAdapter.Fill(ds);
        dt = ds.Tables[0];

        List<TipoEquipamento> data = dt.AsEnumerable()
                      .Select(r => new TipoEquipamento
                      {
                          ID = r.Field<int>("tie_id"),
                          Nome = r.Field<string>("tie_nome"),
                          Status = new Status
                          {
                              Id = r.Field<Int32>("tie_status")
                          }
                      })
                      .ToList();

        return data;
    }

    // GET api/<controller>/5
    public IEnumerable<TipoEquipamento> Get(int id)
    {
        DataSet ds = new DataSet();
        DataTable dt = new DataTable();
        IDbConnection objConexao;
        IDbCommand objCommand;
        IDataAdapter objDataAdapter;
        objConexao = Mapped.Connection();
        objCommand = Mapped.Command("SELECT * FROM TIE_tipo_EQUIPAMENTOS WHERE tie_id = ?id", objConexao);
        objCommand.Parameters.Add(Mapped.Parameter("?id", id));
        objDataAdapter = Mapped.Adapter(objCommand);
        objDataAdapter.Fill(ds);
        dt = ds.Tables[0];

        List<TipoEquipamento> data = dt.AsEnumerable()
                      .Select(r => new TipoEquipamento
                      {
                          ID = r.Field<int>("tie_id"),
                          Nome = r.Field<string>("tie_nome"),
                          Status = new Status
                          {
                              Id = r.Field<Int32>("tie_status")
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
using falconDex.Models;
using FATEC;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Http;

/// <summary>
/// Descrição resumida de TecnicoController
/// </summary>
/// 
namespace falconDex.Controller
{
    public class TecnicoController : ApiController
    {
        public DataSet selectAll()
        {
            DataSet ds = new DataSet();
            IDbConnection objConexao;
            IDbCommand objCommand;
            IDataAdapter objDataAdapter;
            objConexao = Mapped.Connection();
            objCommand = Mapped.Command("SELECT * FROM usu_usuario WHERE usu_permissao = 3 AND usu_status = 1", objConexao);
            objDataAdapter = Mapped.Adapter(objCommand);
            objDataAdapter.Fill(ds);
            objConexao.Close();
            objCommand.Dispose();
            objConexao.Dispose();
            return ds;

        }

        public IEnumerable<Usuario> Get()
        {
            DataSet ds = new DataSet();
            DataTable dt = new DataTable();
            IDbConnection objConexao;
            IDbCommand objCommand;
            IDataAdapter objDataAdapter;
            objConexao = Mapped.Connection();
            objCommand = Mapped.Command("SELECT usu_id, usu_nome, usu_email FROM usu_usuario WHERE usu_permissao = 3 AND usu_status = 1", objConexao);
            objDataAdapter = Mapped.Adapter(objCommand);
            objDataAdapter.Fill(ds);
            dt = ds.Tables[0];

            List<Usuario> data = dt.AsEnumerable()
                          .Select(r => new Usuario
                          {
                              Id = r.Field<int>("usu_id"),
                              Nome = r.Field<string>("usu_nome"),
                              Email = r.Field<string>("usu_email")
                          })
                          .ToList();

            return data;
        }
    }

}
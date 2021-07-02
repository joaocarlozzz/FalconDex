using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

using falconDex.Models;
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;
using FATEC;

/// <summary>
/// Descrição resumida de Class1
/// </summary>
/// 

namespace falconDex.Controller {
    public class UsuarioController
    {

        public Usuario select(String email, String senha)
        {
            Usuario Usuario = null;
            System.Data.IDbConnection objConexao;
            System.Data.IDbCommand objCommand;
            System.Data.IDataReader objDataReader;
            objConexao = Mapped.Connection();
            objCommand = Mapped.Command("SELECT * FROM usu_usuario WHERE usu_email = ?email and" +
                "usu_senha = MD5(?senha)", objConexao);

            objCommand.Parameters.Add(Mapped.Parameter("?email", email));
            objCommand.Parameters.Add(Mapped.Parameter("?senha", senha));
            objDataReader = objCommand.ExecuteReader();
            while (objDataReader.Read())
            {
                Usuario = new Usuario();
                Usuario.Nome = Convert.ToString(objDataReader["usu_nome"]);
            }
            objDataReader.Close();
            objConexao.Close();
            objCommand.Dispose();
            objConexao.Dispose();
            objDataReader.Dispose();
            return Usuario;
        }

        public DataSet selectAll() {
            DataSet ds = new DataSet();
            IDbConnection objConexao;
            IDbCommand objCommand;
            IDataAdapter objDataAdapter;
            objConexao = Mapped.Connection();
            objCommand = Mapped.Command("SELECT * FROM usu_usuario", objConexao);
            objDataAdapter = Mapped.Adapter(objCommand);
            objDataAdapter.Fill(ds);
            objConexao.Close();
            objCommand.Dispose();
            objConexao.Dispose();
            return ds;

        }

        public void update(Usuario usuario, List<Usuario> args) {
            System.Data.IDbConnection objConexao;
            System.Data.IDbCommand objCommand;
            string sql = "UPDATE usu_usuario SET usu_nome=?nome WHERE usu_id =? codigo";
            objConexao = Mapped.Connection();
            objCommand = Mapped.Command(sql, objConexao);
            objCommand.Parameters.Add(Mapped.Parameter("?nome", usuario.Nome));
            objCommand.ExecuteNonQuery();
            objConexao.Close();
            objCommand.Dispose();
            objConexao.Dispose();
        }

        public void delete(Usuario usuario) {
            this.update(usuario, new List<Usuario> {});
        }

        public void insert(Usuario usuario) {
            System.Data.IDbConnection objConexao;
            System.Data.IDbCommand objCommand;
            string sql = "INSERT INTO usu_usuario(usu_nome, usu_email, usu_senha) " +
                "VALUES (?nome, ?email, ?senha)";
            objConexao = Mapped.Connection();
            objCommand = Mapped.Command(sql, objConexao);
            objCommand.Parameters.Add(Mapped.Parameter("?nome", usuario.Nome));
            objCommand.Parameters.Add(Mapped.Parameter("?email", usuario.Email));
            objCommand.Parameters.Add(Mapped.Parameter("?senha", usuario.Senha));
            objCommand.ExecuteNonQuery();
            objConexao.Close();
            objCommand.Dispose();
            objConexao.Dispose();
        }
    }
}
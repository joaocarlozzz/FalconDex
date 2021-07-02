using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Data;
using MySql.Data.MySqlClient;
using FATEC;
using System.Diagnostics;
using falconDex.Models;
/// <summary>
/// Descrição resumida de Class1
/// </summary>
/// 
namespace falconDex.Controller
{
    public class LoginController
    {
        private int counter;

        public Boolean login(Login login)
        {
            DataSet ds = selectCount(login.Ip, login.Date);
            DataRow dataRow = ds.Tables[0].Rows[0];

            counter = Convert.ToInt32(dataRow["CONTAR"].ToString()) + 1;

            //verifica até 5 tentativas
            if (counter <= 5)
            {
                insert(login);

                return logIn(login) == 1;
            }

            return false;
        }

        public IEnumerable<int> getPermissao(Login login)
        {
            DataSet ds = new DataSet();
            DataTable dt = new DataTable();
            System.Data.IDbConnection objConexao;
            System.Data.IDbCommand objCommand;
            System.Data.IDataAdapter objDataAdapter;
            objConexao = Mapped.Connection();
            objCommand = Mapped.Command("SELECT usu_permissao FROM usu_usuario WHERE usu_email = ?email " +
                "AND usu_senha = ?senha", objConexao);

            objCommand.Parameters.Add(Mapped.Parameter("?email", login.Email));
            objCommand.Parameters.Add(Mapped.Parameter("?senha", login.Senha));

            objDataAdapter = Mapped.Adapter(objCommand);
            objDataAdapter.Fill(ds);

            dt = ds.Tables[0];

            objConexao.Close();
            objCommand.Dispose();
            objConexao.Dispose();

            return dt.AsEnumerable().Select(r => r.Field<int>("usu_permissao")).ToList();
        }

        public Boolean insert(Login login)
        {
            try
            {
                IDbConnection objConexao;
                IDbCommand objCommand;
                string sql = "INSERT INTO log_login(log_email, log_senha, log_ip, log_date) " +
                    "VALUES (?email, ?senha, ?ip, ?date)";
                objConexao = Mapped.Connection();
                objCommand = Mapped.Command(sql, objConexao);
                objCommand.Parameters.Add(Mapped.Parameter("?email", login.Email));
                objCommand.Parameters.Add(Mapped.Parameter("?senha", login.Senha));
                objCommand.Parameters.Add(Mapped.Parameter("?ip", login.Ip));
                objCommand.Parameters.Add(Mapped.Parameter("?date", login.Date));

                objCommand.ExecuteNonQuery();
                objConexao.Close();

                objCommand.Dispose();
                objConexao.Dispose();

                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public DataSet selectCount(string ip, DateTime time)
        {
            DataSet ds = new DataSet();

            System.Data.IDbConnection objConexao;
            System.Data.IDbCommand objCommand;
            System.Data.IDataAdapter objDataAdapter;
            objConexao = Mapped.Connection();
            objCommand = Mapped.Command("SELECT count(*) CONTAR FROM log_login WHERE log_ip = ?ip " +
                "AND log_date >= date_add(?date, interval -10 MINUTE)", objConexao);

            objCommand.Parameters.Add(Mapped.Parameter("?ip", ip));
            objCommand.Parameters.Add(Mapped.Parameter("?date", time));

            objDataAdapter = Mapped.Adapter(objCommand);
            objDataAdapter.Fill(ds);
            objConexao.Close();
            objCommand.Dispose();
            objConexao.Dispose();

            return ds;
        }

        public int logIn(Login login)
        {
            DataSet ds = new DataSet();
            int count = 0;

            System.Data.IDbConnection objConexao;
            System.Data.IDbCommand objCommand;
            System.Data.IDataAdapter objDataAdapter;
            objConexao = Mapped.Connection();
            objCommand = Mapped.Command("SELECT * FROM usu_usuario WHERE usu_email = ?email " +
                "AND usu_senha = ?senha", objConexao);

            objCommand.Parameters.Add(Mapped.Parameter("?email", login.Email));
            objCommand.Parameters.Add(Mapped.Parameter("?senha", login.Senha));

            objDataAdapter = Mapped.Adapter(objCommand);
            objDataAdapter.Fill(ds);

            count = ds.Tables[0].Rows.Count;

            objConexao.Close();
            objCommand.Dispose();
            objConexao.Dispose();

            return count;
        }
    }
}
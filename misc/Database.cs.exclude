using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MySql.Data.MySqlClient;

/// <summary>
/// Classe de conexão com o banco de dados
/// </summary>
/// 

namespace falconDex.misc
{
    public class Database
    {
        MySqlConnection connection;

        public Database()
        {
            this.connection = new MySqlConnection("Database=falcon_db;Data Source=server_domain_or_ip;User Id=Bruno;Password=123Mudei");
            this.connection.Open();
        }

        public void dispose()
        {
            connection.Close();
        }
    }

}
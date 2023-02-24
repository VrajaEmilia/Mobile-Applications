using LibraryAppServer.Model;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System.Collections;
using System.Data;

namespace LibraryAppServer.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly string getAllQuery = "select * from books";

        private MySqlConnection getDatabaseConnection()
        {
            string connectionString = "server=localhost;user=root;database=books;password=";
            MySqlConnection connection = new MySqlConnection(connectionString);
            return connection;
        }

        [HttpGet("getBooks")]
        public List<Book> getAllBooks()
        {
            var connection = getDatabaseConnection();
            List<Book> books = new List<Book>();
            try
            {
                connection.Open();
                MySqlCommand cmd = new MySqlCommand(getAllQuery, connection);
                MySqlDataReader rdr = cmd.ExecuteReader();
                while(rdr.Read())
                {
                    Book book = new()
                    {
                        id = rdr.GetInt32("id"),
                        title = rdr.GetString("title"),
                        author = rdr.GetString("author"),
                        year = rdr.GetInt32("year"),
                        description = rdr.GetString ("description"),
                        rating = rdr.GetInt32("rating")

                    };
                    books.Add(book);
                }
                connection.Close();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return books;
        }

        [HttpPost("insertBook")]
        public IActionResult insertBook(Book book)
        {
            var connection = getDatabaseConnection();
            try
            {
                connection.Open();
                MySqlCommand cmd = new MySqlCommand(null, connection);
                cmd.CommandText = "insert into books(id,title,author,year,description,rating) values(NULL,@title,@author,@year,@description,@rating)";
                MySqlParameter title = new MySqlParameter("@title", MySqlDbType.VarChar);
                MySqlParameter author = new MySqlParameter("@author", MySqlDbType.VarChar);
                MySqlParameter year = new MySqlParameter("@year", MySqlDbType.Int32);
                MySqlParameter description = new MySqlParameter("@description", MySqlDbType.VarChar);
                MySqlParameter rating = new MySqlParameter("@rating", MySqlDbType.Int32);
                title.Value = book.title;
                author.Value = book.author;
                year.Value = book.year;
                description.Value = book.description;
                rating.Value = book.rating;
                cmd.Parameters.Add(title);
                cmd.Parameters.Add(author);
                cmd.Parameters.Add(year);
                cmd.Parameters.Add(description);
                cmd.Parameters.Add(rating);
                Console.WriteLine(cmd.CommandText);
                cmd.Prepare();
                cmd.ExecuteNonQuery();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new JsonResult("Failed");
            }
            return new JsonResult(book);
        }
        [HttpPut("editBook")]
        public IActionResult editBook(Book newBook)
        {
            var connection = getDatabaseConnection();
            try
            {
                connection.Open();
                MySqlCommand cmd = new MySqlCommand(null, connection);
                cmd.CommandText = "UPDATE books SET title = @title, author = @author, year = @year, description = @description, rating = @rating WHERE books.id = @id;";
                MySqlParameter id = new MySqlParameter("@id", MySqlDbType.Int32);
                MySqlParameter title = new MySqlParameter("@title", MySqlDbType.VarChar);
                MySqlParameter author = new MySqlParameter("@author", MySqlDbType.VarChar);
                MySqlParameter year = new MySqlParameter("@year", MySqlDbType.Int32);
                MySqlParameter description = new MySqlParameter("@description", MySqlDbType.VarChar);
                MySqlParameter rating = new MySqlParameter("@rating", MySqlDbType.Int32);

                id.Value = newBook.id;
                title.Value = newBook.title;
                author.Value = newBook.author;
                year.Value = newBook.year;
                description.Value = newBook.description;
                rating.Value = newBook.rating;
                cmd.Parameters.Add(id);
                cmd.Parameters.Add(title);
                cmd.Parameters.Add(author);
                cmd.Parameters.Add(year);
                cmd.Parameters.Add(description);
                cmd.Parameters.Add(rating);
                Console.WriteLine(cmd.CommandText);
                cmd.Prepare();
                cmd.ExecuteNonQuery();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new JsonResult("Failed");
            }
            return new JsonResult(newBook);
        }
        [HttpDelete("deleteBook")]
        public IActionResult deleteBook(int bookId)
        {
            var connection = getDatabaseConnection();
            try
            {
                connection.Open();
                MySqlCommand cmd = new MySqlCommand(null, connection);
                cmd.CommandText = "DELETE FROM books WHERE books.id = @id";
                MySqlParameter id = new MySqlParameter("@id", MySqlDbType.Int32);
                id.Value = bookId;
                cmd.Parameters.Add(id);
                Console.WriteLine(cmd.CommandText);
                cmd.Prepare();
                cmd.ExecuteNonQuery();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new JsonResult("Failed");
            }
            return new JsonResult("deleted");
        }
    }
}

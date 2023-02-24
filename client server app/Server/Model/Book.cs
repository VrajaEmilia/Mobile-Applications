using System.Collections.Specialized;

namespace LibraryAppServer.Model
{
    public class Book
    {
        public int id { get; set; }
        public string title { get; set; }
        public string author { get; set; }
        public int year { get; set; }
        public string description { get; set; }
        public int rating { get; set; }

    }
}

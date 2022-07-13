using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace split_it.Models
{
    /// <summary>Notification entity and DTO</summary>
    public class Notification
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        /// <summary>Guid of Item in the specified Domain</summary>
        public Guid ItemId { get; set; }

        /// <summary>Brief user friendly notification message</summary>
        public string Message { get; set; }

        /// <summary>The 'route' that this notification belongs to</summary>
        /// <remarks>
        /// Without the '/api' prefix. <br/>
        /// This can be used to form a full route pointing to a specific resorce. <br/>
        /// Like: '/api/{Domain}/{Id}' => '/api/Bill/0000-0000-0000-0000'
        /// </remarks>
        public string Domain { get; set; }
    }
}

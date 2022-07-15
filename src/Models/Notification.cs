using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace split_it.Models
{
    /// <summary>Notification entity and DTO</summary>
    public class Notification
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        /// <summary>User that this notification belongs to, not really in use</summary>
        [JsonIgnore]
        public User User { get; set; }

        /// <summary>UserId that this notification belongs to</summary>
        [ForeignKey("User")]
        public Guid UserId { get; set; }

        /// <summary>Guid of resource in the specified Domain</summary>
        public Guid ResourceId { get; set; }

        /// <summary>Brief user friendly notification message</summary>
        public string Message { get; set; }

        /// <summary>The 'route' that this notification belongs to</summary>
        /// <remarks>
        /// Without the '/api' prefix. <br/>
        /// This can be used to form a full route pointing to a specific resorce. <br/>
        /// Like: '/api/{Domain}/{Id}' => '/api/Bill/0000-0000-0000-0000'
        /// </remarks>
        public string Domain { get; set; }

        /// <summary>Notification creation date</summary>
        public DateTime CreatedAt { get; set; }
    }

    public enum NotificationSort
    {
        DATE_ASC,
        DATE_DESC
    }
}

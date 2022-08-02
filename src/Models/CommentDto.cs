using System;
using System.ComponentModel.DataAnnotations;

namespace split_it.Models
{
    public class CommentDto
    {
        public Guid Id { get; set; }
        public UserInfoDto Commenter { get; set; }
        public string Content { get; set; }

        public static CommentDto FromEntity(Comment comment)
        {
            return new CommentDto
            {
                Id = comment.Id,
                Content = comment.Content,
                Commenter = UserInfoDto.FromEntity(comment.Commenter),
            };
        }
    }

    public class CommentInputDto
    {
        [Required]
        [MinLength(3)]
        public string Content { get; set; }
    }

    public enum CommentSort
    {
        DATE_ASC,
        DATE_DESC,
    }
}

using System;
using Microsoft.AspNetCore.Mvc;

namespace split_it.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {

        [HttpGet("/{user_id:Guid}")]
        public User Get(Guid user_id)
        {

            return new User();
        }

        [HttpPost("/")]
        public User Create(User user)
        {
            return new User();
        }

    }
}

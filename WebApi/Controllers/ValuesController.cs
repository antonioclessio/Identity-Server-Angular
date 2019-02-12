using System;
using System.Collections.Generic;
using System.Web.Http;

namespace WebApi.Controllers
{
    [Authorize]
    [RoutePrefix("api/values")]
    public class ValuesController : ApiController
    {
        [HttpGet]
        [Route("")]
        public IEnumerable<string> Get()
        {
            Random rnd = new Random();
            return new string[] { rnd.Next(0, 10).ToString(), rnd.Next(0, 10).ToString() };
        }

        [HttpGet]
        [Authorize(Roles = "GetRole")]
        [Route("role")]
        public IEnumerable<string> GetRole()
        {
            return new string[] { "João", "Maria", "José" };
        }
    }
}

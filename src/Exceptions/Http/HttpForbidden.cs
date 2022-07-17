using System;
using System.Net;
using System.Runtime.Serialization;

namespace split_it.Exceptions.Http
{
    [Serializable]
    public class HttpForbidden : CustomHttpException
    {
        private const HttpStatusCode ExceptionStatusCode = HttpStatusCode.Forbidden;

        public HttpForbidden(string message) : base(ExceptionStatusCode, message)
        {
        }

        public HttpForbidden(string message, Exception inner) : base(ExceptionStatusCode, message, inner)
        {
        }

        public HttpForbidden() : base(ExceptionStatusCode)
        {
        }

        protected HttpForbidden(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}

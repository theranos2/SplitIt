using System;
using System.Net;
using System.Runtime.Serialization;

namespace split_it.Exceptions.Http
{
    [Serializable]
    public class HttpForbiddenRequest : CustomHttpException
    {
        private const HttpStatusCode ExceptionStatusCode = HttpStatusCode.Forbidden;

        public HttpForbiddenRequest(string message) : base(ExceptionStatusCode, message)
        {
        }

        public HttpForbiddenRequest(string message, Exception inner) : base(ExceptionStatusCode, message, inner)
        {
        }

        public HttpForbiddenRequest() : base(ExceptionStatusCode)
        {
        }

        protected HttpForbiddenRequest(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}

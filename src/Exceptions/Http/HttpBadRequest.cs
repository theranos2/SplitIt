using System;
using System.Net;
using System.Runtime.Serialization;

namespace split_it.Exceptions.Http
{
    [Serializable]
    public class HttpBadRequest : CustomHttpException
    {
        private const HttpStatusCode ExceptionStatusCode = HttpStatusCode.BadRequest;

        public HttpBadRequest(string message) : base(ExceptionStatusCode, message)
        {
        }

        public HttpBadRequest(string message, Exception inner) : base(ExceptionStatusCode, message, inner)
        {
        }

        public HttpBadRequest() : base(ExceptionStatusCode)
        {
        }

        protected HttpBadRequest(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}

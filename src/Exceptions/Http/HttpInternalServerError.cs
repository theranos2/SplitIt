using System;
using System.Net;
using System.Runtime.Serialization;

namespace split_it.Exceptions.Http
{
    [Serializable]
    public class HttpInternalServerError : CustomHttpException
    {
        private const HttpStatusCode ExceptionStatusCode = HttpStatusCode.InternalServerError;

        public HttpInternalServerError(string message) : base(ExceptionStatusCode, message)
        {
        }

        public HttpInternalServerError(string message, Exception inner) : base(ExceptionStatusCode, message, inner)
        {
        }

        public HttpInternalServerError() : base(ExceptionStatusCode)
        {
        }

        protected HttpInternalServerError(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}

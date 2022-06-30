using System;
using System.Net;
using System.Runtime.Serialization;
using split_it.Exceptions;

namespace split_it.Exceptions.Http
{
    [Serializable]
    public class HttpNotFound : CustomHttpException
    {
        private const HttpStatusCode ExceptionStatusCode = HttpStatusCode.NotFound;

        public HttpNotFound(string message) : base(ExceptionStatusCode, message)
        {
        }

        public HttpNotFound(string message, Exception inner) : base(ExceptionStatusCode, message, inner)
        {
        }

        public HttpNotFound() : base(ExceptionStatusCode)
        {
        }

        protected HttpNotFound(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }

    }
}

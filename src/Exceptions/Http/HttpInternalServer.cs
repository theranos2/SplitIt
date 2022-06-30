using System;
using System.Net;
using System.Runtime.Serialization;
using split_it.Exceptions;

namespace split_it.Exceptions.Http
{
    [Serializable]
    public class HttpInternalServer : CustomHttpException
    {

        private const HttpStatusCode ExceptionStatusCode = HttpStatusCode.InternalServerError;


        public HttpInternalServer(string message) : base(ExceptionStatusCode, message)
        {
        }

        public HttpInternalServer(string message, Exception inner) : base(ExceptionStatusCode, message, inner)
        {
        }

        public HttpInternalServer() : base(ExceptionStatusCode)
        {
        }

        protected HttpInternalServer(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }

    }
}

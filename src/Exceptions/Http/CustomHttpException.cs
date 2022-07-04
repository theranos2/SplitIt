using System;
using System.Net;
using System.Runtime.Serialization;

namespace split_it.Exceptions.Http
{
    [Serializable]
    public class CustomHttpException : Exception
    {

        public HttpStatusCode StatusCode { get; }


        public CustomHttpException(HttpStatusCode code)
        {
            StatusCode = code;
        }

        public CustomHttpException(HttpStatusCode code, string message) : base(message)
        {
            StatusCode = code;
        }

        public CustomHttpException(HttpStatusCode code, string message, Exception inner) : base(message, inner)
        {
            StatusCode = code;
        }

        public CustomHttpException(string message) : base(message)
        {
            StatusCode = HttpStatusCode.InternalServerError;
        }

        public CustomHttpException(string message, Exception innerException) : base(message, innerException)
        {
            StatusCode = HttpStatusCode.InternalServerError;
        }

        protected CustomHttpException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
            StatusCode = HttpStatusCode.InternalServerError;
        }

        protected CustomHttpException()
        {
            StatusCode = HttpStatusCode.InternalServerError;
        }

    }
}

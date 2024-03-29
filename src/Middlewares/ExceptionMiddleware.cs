using System;
using System.Collections.Generic;
using System.Net;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using split_it.Exceptions.Http;

namespace split_it.Middlewares
{
    public class ProblemDetailsExt
    {
        [JsonPropertyName("Errors")]
        public List<string> Errors { get; set; }

        [JsonIgnore]
        public int? Status { get; set; }

    }
    public sealed class ExceptionMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next.Invoke(context);
            }
            catch (CustomHttpException exception)
            {
                await HandleExceptionAsync(
                    context, GenerateProblemDetails(context, exception.StatusCode, exception.Message), exception);
            }
            catch (Exception exception)
            {
                //await HandleExceptionAsync(
                //context, GenerateProblemDetails(context, HttpStatusCode.InternalServerError, exception.Message), exception);
                throw exception; // rethrow during devolopment. comment this in prod.
            }
        }

        private static ProblemDetailsExt GenerateProblemDetails(HttpContext context, HttpStatusCode code, string message)
        {
            return new ProblemDetailsExt
            {
                Status = (int)code,
                Errors = new List<string> { message },
                //Instance = context.Request.Path
            };
        }

        private static Task HandleExceptionAsync(HttpContext context, ProblemDetailsExt problemDetails, Exception exception)
        {
            if (context.Response.HasStarted)
            {
                return Task.CompletedTask;
            }

            context.Response.Clear();
            context.Response.ContentType = "application/problem+json";

            if (problemDetails.Status != null)
            {
                context.Response.StatusCode = (int)problemDetails.Status;
            }

            return context.Response.WriteAsJsonAsync(problemDetails);
        }

    }
}

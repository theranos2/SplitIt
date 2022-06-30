using System;
using System.Net;
using System.Threading.Tasks;
using split_it.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace split_it.Middlewares
{
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
                await HandleExceptionAsync(
                    context, GenerateProblemDetails(context, HttpStatusCode.InternalServerError, exception.Message), exception);
            }
        }

        private static ProblemDetails GenerateProblemDetails(HttpContext context, HttpStatusCode code, string message)
        {
            return new ProblemDetails
            {
                Status = (int)code,
                Title = message,
                Instance = context.Request.Path
            };
        }

        private static Task HandleExceptionAsync(HttpContext context, ProblemDetails problemDetails, Exception exception)
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

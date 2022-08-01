using System.Linq;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.AspNetCore.Mvc.ModelBinding.Metadata;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace split_it.Utils
{
    /// <summary>Make swagger ignore this parameter</summary>
    public class IgnoreParameterAttribute : System.Attribute
    {
    }

    public class IgnoreParameterAttributeFilter : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            if (operation == null || context == null || context.ApiDescription?.ParameterDescriptions == null)
                return;

            var parametersToHide = context.ApiDescription.ParameterDescriptions
                .Where(parameterDescription => ParameterHasIgnoreAttribute(parameterDescription))
                .ToList();

            if (parametersToHide.Count == 0)
                return;

            foreach (var parameterToHide in parametersToHide)
            {
                var parameter = operation.Parameters
                    .FirstOrDefault(parameter =>
                        string.Equals(parameter.Name, parameterToHide.Name, System.StringComparison.Ordinal)
                    );
                if (parameter != null)
                    operation.Parameters.Remove(parameter);
            }
        }

        private static bool ParameterHasIgnoreAttribute(ApiParameterDescription parameterDescription)
        {
            if (
                parameterDescription.ModelMetadata is DefaultModelMetadata metadata
                && metadata?.Attributes?.ParameterAttributes != null
            )
            {
                return metadata.Attributes.ParameterAttributes
                    .Any(attribute => attribute.GetType() == typeof(IgnoreParameterAttribute));
            }
            return false;
        }
    }
}
// heavily inspired by https://stackoverflow.com/a/69652070

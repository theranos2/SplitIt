using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using split_it.Middlewares;
using Microsoft.AspNetCore.Mvc;
using split_it.Exceptions;
using Microsoft.AspNetCore.Authentication;
using split_it.Authentication;

namespace split_it
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllersWithViews(options => options.Filters.Add(typeof(ValidationResponse))); // Use our custom validation response
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true; // Disable the default validation response
            });

            services.AddDbContext<DatabaseContext>(); // Inject in our database to be used in every controller

            services.AddAuthentication("TokenAuth").AddScheme<AuthenticationSchemeOptions, AuthHandler>("TokenAuth", null); // Assigning an auth handler to every request that has authorization

            // Add swagger documentation
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "Split-It!", Version = "v1" });
            });

            services.AddTransient<ExceptionMiddleware>(); // Required to allow middleware to function. Because it inherists IMiddleWare 

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, DatabaseContext _db)
        {
            app.UseMiddleware<ExceptionMiddleware>();

            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Version 1.0"));
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });
            //app.UseSpa(spa =>
            //{
                //spa.Options.SourcePath = "ClientApp";

                //if (env.IsDevelopment())
                //{
                    //spa.UseReactDevelopmentServer(npmScript: "start");
                //}
            //});
        }
    }
}

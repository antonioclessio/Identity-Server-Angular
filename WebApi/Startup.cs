using IdentityServer3.AccessTokenValidation;
using Microsoft.Owin.Cors;
using Owin;

namespace WebApi
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseCors(CorsOptions.AllowAll);

            app.UseIdentityServerBearerTokenAuthentication(new IdentityServerBearerTokenAuthenticationOptions
            {
                Authority = "https://localhost:44325/",

                // For access to the introspection endpoint
                ClientId = "api",
                ClientSecret = "api-secret",

                RequiredScopes = new[] { "api" }
            });
        }
    }
}
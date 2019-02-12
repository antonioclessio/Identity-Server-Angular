using IdentityServer.Config;
using IdentityServer3.Core.Configuration;
using Owin;
using System;
using System.IO;
using System.Security.Cryptography.X509Certificates;

namespace IdentityServer
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var factory = new IdentityServerServiceFactory();
            factory.UseInMemoryClients(Mock.GetClients());
            factory.UseInMemoryScopes(Mock.GetScopes());
            factory.UseInMemoryUsers(Mock.GetUsers());

            app.UseIdentityServer(new IdentityServerOptions
            {
                SiteName = "Single Sign-On",
                Factory = factory,
                SigningCertificate = LoadCertificate()
            });
        }

        private static X509Certificate2 LoadCertificate()
        {
            return new X509Certificate2(
                Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"bin\Config\idsrv3test.pfx"), "idsrv3test");
        }
    }
}
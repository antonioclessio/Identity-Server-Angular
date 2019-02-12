using IdentityServer3.Core;
using IdentityServer3.Core.Models;
using IdentityServer3.Core.Services.InMemory;
using System.Collections.Generic;
using System.Security.Claims;

namespace IdentityServer.Config
{
    public static class Mock
    {
        public static List<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {
                    Enabled = true,
                    ClientName = "Angular Client",
                    ClientId = "angular-client",
                    Flow = Flows.Implicit,

                    RedirectUris = new List<string>
                    {
                        "http://localhost:4200/login",
                        "http://localhost:4200/refresh"
                    },

                    PostLogoutRedirectUris = new List<string>
                    {
                        "http://localhost:4200/signout"
                    },

                    AllowedCorsOrigins = new List<string>
                    {
                        "http://localhost:4200"
                    },

                    AllowAccessToAllScopes = true,
                    AccessTokenLifetime = 60,
                    RequireConsent = false
                }
            };
        }

        public static List<Scope> GetScopes()
        {
            return new List<Scope>
            {
                StandardScopes.OpenId,
                StandardScopes.Profile,
                StandardScopes.Email,

                new Scope
                {
                    Name = "api",

                    DisplayName = "Access to API",
                    Description = "This will grant you access to the API",

                    ScopeSecrets = new List<Secret>
                    {
                        new Secret("api-secret".Sha256())
                    },

                    Type = ScopeType.Resource
                }
            };
        }

        public static List<InMemoryUser> GetUsers()
        {
            return new List<InMemoryUser>
            {
                new InMemoryUser
                {
                    Username = "bob",
                    Password = "secret",
                    Subject = "1",

                    Claims = new[]
                    {
                        new Claim(Constants.ClaimTypes.GivenName, "Bob"),
                        new Claim(Constants.ClaimTypes.FamilyName, "Smith"),
                        new Claim(Constants.ClaimTypes.Email, "bob.smith@email.com")
                    }
                },
                new InMemoryUser
                {
                    Username = "clessio",
                    Password = "secret",
                    Subject = "2",

                    Claims = new[]
                    {
                        new Claim("Role", "GetRole")
                    }
                }
            };
        }
    }
}
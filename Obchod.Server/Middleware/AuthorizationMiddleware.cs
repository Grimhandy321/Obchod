using Microsoft.AspNetCore.Authorization;
using Obchod.Server.Attributes;

public class AuthorizationMiddleware
{
    private readonly RequestDelegate _next;

    public AuthorizationMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var endpoint = context.GetEndpoint();
        if (endpoint != null)
        {
            var authorizeAttributes = endpoint.Metadata.GetOrderedMetadata<SessionAuthorizeAttribute>();

            // Check if any [Authorize] has the role "Admin"
            foreach (var attribute in authorizeAttributes)
            {
                if (attribute.Roles == "Admin")
                {
                    // Check if the user has the "Admin" role
                    if (!context.User.Identity.IsAuthenticated)
                    {
                        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                        await context.Response.WriteAsJsonAsync(new
                        {
                            status = "error",
                            message = "User is not authenticated."
                        });
                        return; 
                    }

                    if (!context.User.IsInRole("Admin"))
                    {
                        context.Response.StatusCode = StatusCodes.Status403Forbidden;
                        await context.Response.WriteAsJsonAsync(new
                        {
                            status = "error",
                            message = "Admin access required"
                        });
                        return; 
                    }
                }
                else if (attribute.Roles == null) // This means the action has [Authorize]
                {
                    // This is for cases where the action just has [Authorize] 
                    if (!context.User.Identity.IsAuthenticated)
                    {
                        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                        await context.Response.WriteAsJsonAsync(new
                        {
                            status = "error",
                            message = "User is not authenticated."
                        });
                        return;
                    }
                }
            }
        }

        await _next(context);
    }
}

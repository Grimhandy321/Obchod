using System.Data;

namespace Obchod.Server.Attributes
{
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, AllowMultiple = true)]
    public class SessionAuthorizeAttribute : Attribute
    {
        public string? Roles { get; }
        public SessionAuthorizeAttribute(string? Roles = null)
        {
            this.Roles = Roles;
        }
    }

}

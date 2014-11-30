using Microsoft.AspNet.Builder;

namespace Talk
{
    public class Startup
    {
        public void Configure(IApplicationBuilder app)
        {
            app.UseStaticFiles();
        }
    }
}

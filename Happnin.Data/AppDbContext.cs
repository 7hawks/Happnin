using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;


namespace Happnin.Data
{
    public class AppDbContext : ApiAuthorizationDbContext<User>
    {
        //public DbSet<User> Users { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Category> Categories { get; set; }

        public AppDbContext(DbContextOptions dbContext,  
            IOptions<OperationalStoreOptions> operationalStoreOptions): base(dbContext, operationalStoreOptions) { }
        
    }

}

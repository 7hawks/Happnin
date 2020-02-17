﻿using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Happnin.Data
{
    public class AppDbContext : DbContext 
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Category> Categories { get; set; }
        private IHttpContextAccessor HttpContext { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> dbContext) : base(dbContext) { }

        public AppDbContext(DbContextOptions<AppDbContext> dbContext, IHttpContextAccessor httpContext) :
            this(dbContext)
        {
            HttpContext = httpContext;
        }
    }
}

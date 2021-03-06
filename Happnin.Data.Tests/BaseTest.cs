﻿using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using IdentityServer4.EntityFramework.Options;
using Microsoft.Extensions.Options;

namespace Happnin.Data.Tests
{
    public class BaseTest : IDisposable
    {
        protected BaseTest()
        {
            OpenConnection();
        }

        public void Dispose()
        {
            _SqliteConnection?.Dispose();
        }

        protected SqliteConnection _SqliteConnection { get; set; }
        protected DbContextOptions<AppDbContext> Options { get; set; }

        private static ILoggerFactory GetLoggerFactory()
        {
            IServiceCollection serviceCollection = new ServiceCollection();
            serviceCollection.AddLogging(builder =>
            {
                builder.AddConsole()
                    .AddFilter(DbLoggerCategory.Database.Command.Name,
                        LogLevel.Information);
            });
            return serviceCollection.BuildServiceProvider().
                GetService<ILoggerFactory>();
        }
   
        public void OpenConnection()
        {
            _SqliteConnection = new SqliteConnection("DataSource=:memory:");
            _SqliteConnection.Open();

            Options = new DbContextOptionsBuilder<AppDbContext>()
                .UseSqlite(_SqliteConnection)
                .UseLoggerFactory(GetLoggerFactory())
                .EnableSensitiveDataLogging()
                .Options;

            using (var context = new AppDbContext(Options,  new OptionsWrapper<OperationalStoreOptions>(new OperationalStoreOptions())))
            {
                context.Database.EnsureCreated();
            }
        }
    }
}

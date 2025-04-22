using System;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext(DbContextOptions options) : DbContext(options)
{
     public DbSet<AppUser> Users { get; set; }

    internal object Entity(AppUser user)
    {
        throw new NotImplementedException();
    }
}
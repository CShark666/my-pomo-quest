using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using PomoQuestApi.Auth.Models;
using PomoQuestApi.PomoQuest.Models;

namespace PomoQuestApi.data
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Quest> Quests { get; set; }

        private static readonly JsonSerializerOptions JsonOptions = new()
        {
            Converters = { new JsonStringEnumConverter() }
        };

        public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(u => u.Id);

            entity.Property(u => u.Email)
                .IsRequired();

            entity.HasIndex(u => u.Email)
                .IsUnique();

            entity.Property(u => u.PasswordHash)
                .IsRequired();

            entity.Property(u => u.CreatedAt)
                .IsRequired();

            entity.Property(u => u.IsActive)
                .IsRequired();
        });

            modelBuilder.Entity<Session>(entity =>
        {
            entity.HasKey(s => s.Id);

            entity.Property(s => s.CreatedAt)
                .IsRequired();

            entity.HasIndex(s => s.UserId);

            entity.HasOne(s => s.User)
                .WithMany(u => u.Sessions)
                .HasForeignKey(s => s.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });

            modelBuilder.Entity<Profile>(entity =>
            {
                entity.HasKey(p => p.Id);

                entity.Property(p => p.Id)
                .ValueGeneratedOnAdd();

                entity.Property(p => p.Email)
                .IsRequired();

                entity.Property(p => p.Name)
                .IsRequired();

                entity.HasIndex(p => p.UserId).IsUnique();

                entity.HasOne(p => p.User)
                    .WithOne(u => u.Profile)
                    .HasForeignKey<Profile>(p => p.UserId)
                    .IsRequired()
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Quest>(entity =>
            {
                entity.HasKey(q => q.Id);

                entity.Property(q => q.Id)
                    .ValueGeneratedOnAdd();

                entity.Property(q => q.BreaksConfig)
                    .HasConversion(
                        b => b != null
                            ? JsonSerializer.Serialize(b, JsonOptions)
                            : null,

                        b => !string.IsNullOrEmpty(b)
                            ? JsonSerializer.Deserialize<Dictionary<BreakType, long>>(b, JsonOptions)
                            : null
                    );

                entity.OwnsOne(q => q.CurrentInterval);

                entity.HasIndex(q => new { q.UserId, q.Status });

                entity.HasOne(q => q.User)
                    .WithMany(u => u.Quests)
                    .HasForeignKey(q => q.UserId)
                    .IsRequired()
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
        protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
        {
            // Усі Enum у проєкті будуть зберігатися як String
            configurationBuilder
                .Properties<IntervalStatus>()
                    .HaveConversion<string>();
        }
    }
}
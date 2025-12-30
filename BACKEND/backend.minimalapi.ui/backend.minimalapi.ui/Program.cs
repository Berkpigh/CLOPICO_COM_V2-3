using backend.minimalapi.ui;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using backend.minimalapi.Core.Auths.Models;
using backend.minimalapi.Core.Auths.IF;
using backend.minimalapi.Core.Auths.Services;
using backend.minimalapi.Core.Cli.Models;
using backend.minimalapi.Core.Cli.IF;
using backend.minimalapi.Core.Cli.Services;
using backend.minimalapi.Core.Prod.Models;
using backend.minimalapi.Core.Prod.IF;
using backend.minimalapi.Core.Prod.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllHeaders",
    builder =>
    {
        builder.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
    });
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

#region Parametrage swagger + bearer dans swagger
builder.Services.AddSwaggerGen(options =>
{
    //Définition
    options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme()
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});
#endregion

string? connectionString = builder.Configuration.GetConnectionString("backoffice.database");

builder.Services.AddDbContext<AuthenticationDbContext>(options =>
{
    options.UseSqlServer(connectionString, b => b.MigrationsAssembly("backend.minimalapi.ui"));
});

builder.Services.AddDbContext<ClientDbContext>(options =>
{
    options.UseSqlServer(connectionString, b => b.MigrationsAssembly("backend.minimalapi.ui"));
});

builder.Services.AddDbContext<ProduitDbContext>(options =>
{
    options.UseSqlServer(connectionString, b => b.MigrationsAssembly("backend.minimalapi.ui"));
    options.EnableSensitiveDataLogging();
});

builder.Services.AddIdentityCore<AuthenticationUser>(options =>
                {
                    //options.SignIn.RequireConfirmedEmail = true;
                })
                .AddEntityFrameworkStores<AuthenticationDbContext>();

IConfigurationSection jwtsection = builder.Configuration.GetSection("JwtTokenSettings");

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.IncludeErrorDetails = true;

    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ClockSkew = TimeSpan.Zero,
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtsection["ValidIssuer"],
        ValidAudience = jwtsection["ValidAudience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(jwtsection["SymmetricSecurityKey"]!))
    };
});

builder.Services.AddAuthorization();

builder.Services.AddScoped<ITokenService, JwtTokenService>();
builder.Services.AddScoped<IRoleService, SqlServerCreateRolesService>();
builder.Services.AddScoped<IClientService, SqlServerCreateClientService>();
builder.Services.AddScoped<IGetAllClientService, SqlServerGetAllClientService>();
builder.Services.AddScoped<IGetAllNPService, SqlServerGetAllNPService>();
builder.Services.AddScoped<IGetAllCuvéeService, SqlServerGetAllCuvéeService>();
builder.Services.AddScoped<IGetAllCuvéeeDBService, SqlServerGetAllCuvéeDBService>();
builder.Services.AddScoped<IGetAllBouteilleService, SqlServerGetAllBouteilleService>();

var app = builder.Build();

// Configure the HTTP request pipeline. use --> middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAllHeaders");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
//


app.MapCreationUserEndpoints();

app.MapLoginUserEndpoints();

app.MapDclientEndpoints();

app.MapClientInfoEndpoints();

app.MapNumerosPostauxEndpoints();

app.MapDcuvéeEndpoints();

app.MapDcuvéeBDEndpoints();

app.MapDbouteilleEndpoints();

app.MapDstockEndpoints();

app.Run();


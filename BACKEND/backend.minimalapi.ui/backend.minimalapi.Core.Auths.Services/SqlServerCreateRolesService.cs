using backend.minimalapi.Core.Auths.IF;
using backend.minimalapi.Core.Auths.Models;
using Microsoft.AspNetCore.Identity;

//using ServiceStack.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.minimalapi.Core.Auths.Services
{
    public class SqlServerCreateRolesService : IRoleService
    {
        private readonly AuthenticationDbContext _dbContext;
        private string[] rolenames = ["superadmin", "admin", "resto", "ami", "hôte", "client"];
        #region constructors
        public SqlServerCreateRolesService(AuthenticationDbContext context)
        {
            _dbContext = context;
        }
        #endregion

        #region Public methods

        public void createRoles()
        {
            var rlist = _dbContext.Roles.ToList();
            if (rlist.Count >= rolenames.Length) { return; }

            Roles role;
            bool newrole = false;
            foreach (string rn in rolenames)
            {
                var r = _dbContext.Roles
                        .Where(r => r.Name == rn)
                        .FirstOrDefault();
                if (r == null)
                {
                    role = new();
                    role.Name = rn;
                    _dbContext.Roles.Add(role);
                    newrole = true;
                }
            }
            if (newrole) { _dbContext.SaveChanges(); }
            return;
        }
        public string getRoleName(string roleName)
        {
            string goodrol = "";
            foreach (string rol in rolenames)
            {
                if (roleName.Equals(rol)) { goodrol = rol; break; }
            }
            if (goodrol == "") { goodrol = "client"; }
            return goodrol;
        }
        public string getRoleId(string roleName)
        {
            var query = (from item in _dbContext.Roles
                         where item.Name == roleName
                         select item);
            var lr = query.ToList();
            string resid = "";
            foreach (var role in lr) { resid = role.Id.ToString(); }
            return resid;
        }
        //IList<Roles> rn = (IList<Roles>)_dbContext.Roles.ToList();
        //        IQueryable<Roles> rn = (IQueryable<Roles>)_dbContext.Roles.Where(r => r.Name == goodrol);
        public void createUserRole(string userid, string roleid)
        {
            UserRole ur = new UserRole { UserId = userid, RoleId = roleid };
            _dbContext.UserRoles.Add(ur);
            _dbContext.SaveChanges();
        }
        public string getRoleNameById(string roleId)
        {
            //Roles? roles = new();

            var r = _dbContext.Roles
                .Where(r => r.Id == roleId).
                FirstOrDefault();
            if (r == null) { return ""; }
            if (!(r.Name == null)) { return r.Name; }
            return "";
        }

        public string getUserRoleRoleId(string userId)
        {
            UserRole userRole = new();
            var ur = _dbContext.UserRoles
                    .Where(userRole => userRole.UserId == userId)
                    .FirstOrDefault();
            if (ur == null) { return ""; }
            return ur.RoleId;
        }
        #endregion
    }
}
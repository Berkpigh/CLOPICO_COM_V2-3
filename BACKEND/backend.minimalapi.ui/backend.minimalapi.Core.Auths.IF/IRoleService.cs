using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.minimalapi.Core.Auths.IF
{
    public interface IRoleService
    {
        void createRoles();

        string getRoleId(string roleName);

        string getRoleName(string roleName);

        void createUserRole(string userId, string roleId);

        string getRoleNameById(string roleId);

        string getUserRoleRoleId(string userId);

    }
}

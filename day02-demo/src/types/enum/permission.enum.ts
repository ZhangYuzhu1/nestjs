export enum PermissionType {
  USER_CREATE = 'user:create',
  USER_DELETE = 'user:delete',
  USER_QUERY = 'user:query',
  USER_UPDATE = 'user:update',

  CAT_CREATE = 'cat:create',
  CAT_DELETE = 'cat:delete',
  CAT_QUERY = 'cat:query',
  CAT_UPDATE = 'cat:update',

  ROLE_CREATE = 'role:create',
  ROLE_DELETE = 'role:delete',
  ROLE_QUERY = 'role:query',
  ROLE_UPDATE = 'role:update',
}

export const permissionDescriptions: Record<PermissionType, string> = {
  [PermissionType.USER_CREATE]: '创建用户',
  [PermissionType.USER_DELETE]: '删除用户',
  [PermissionType.USER_UPDATE]: '更新用户',
  [PermissionType.USER_QUERY]: '查询用户',
  [PermissionType.CAT_CREATE]: '创建猫',
  [PermissionType.CAT_DELETE]: '删除猫',
  [PermissionType.CAT_UPDATE]: '更新猫',
  [PermissionType.CAT_QUERY]: '查询猫',
  [PermissionType.ROLE_CREATE]: '创建角色',
  [PermissionType.ROLE_DELETE]: '删除角色',
  [PermissionType.ROLE_UPDATE]: '更新角色',
  [PermissionType.ROLE_QUERY]: '查询角色',
}

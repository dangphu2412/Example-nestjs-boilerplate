export interface PermissionData<T extends RuleData> {
  [index: string]: T
}

export interface RuleData {
  method: string,
  args: string[]
}

export interface RoleData {
  permissions: string[]
}

export interface RoleWithPriority extends RoleData {
  priority: number;
}

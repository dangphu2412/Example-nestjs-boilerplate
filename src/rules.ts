export interface BeforeEffect {
  method: string,
  args: string[]
}

export interface Permission {
      beforeCreate?: BeforeEffect,
      beforeUpdate?: BeforeEffect
}

export interface Role {
    name: string,
    priority: PRIORITY,
    permissions: string[]
}

export enum PRIORITY {
  LOW,
  MED,
  HIGH
}

export const PERMISSION: Record<string, Permission> = {
    UPDATE_PUBLIC_TASK: {
        beforeUpdate: {
            method: 'userService.requiredHigherPermissionThanAuthor',
            args: ['UserDetail', 'TaskData']
        }
    },
    UPDATE_SELF_TASK: {
        beforeUpdate: {
            method: 'userService.mustBeTaskAuthor',
            args: ['UserDetail', 'TaskData']
        }
    },
    REPORT_SPAM_TASK: {
        beforeUpdate: {
            method: 'taskService.isTaskPersisting',
            args: ['TaskData']
        }
    }
}

export const ROLE: Record<string, Role> = {
    LEADER: {
        priority: PRIORITY.HIGH,
        name: 'leader',
        permissions: ['UPDATE_PUBLIC_TASK']
    },
    STAFF: {
        priority: PRIORITY.MED,
        name: 'staff',
        permissions: ['UPDATE_SELF_TASK']
    },
    SUPPORTER: {
        priority: PRIORITY.MED,
        name: 'supporter',
        permissions: ['UPDATE_SELF_TASK', 'REPORT_SPAM_TASK']
    }
}

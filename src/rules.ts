import {PermissionData, RuleData, RoleWithPriority} from '@packages/ufsaModel/types/RulesType';

export enum PRIORITY {
    LOW,
    MED,
    HIGH
}

export const Rules: PermissionData<RuleData> = {
    UPDATE_PUBLIC_TASK: {
        method: 'RoleService.isRoleAdmin',
        args: []
    },
    UPDATE_SELF_TASK: {
        method: 'userService.mustBeTaskAuthor',
        args: ['UserDetail', 'TaskData']
    },
    REPORT_SPAM_TASK: {
        method: 'taskService.isTaskPersisting',
        args: ['TaskData']
    }
}

export const ROLE: Record<string, RoleWithPriority> = {
    LEADER: {
        priority: PRIORITY.HIGH,
        permissions: ['UPDATE_PUBLIC_TASK']
    },
    STAFF: {
        priority: PRIORITY.MED,
        permissions: ['UPDATE_SELF_TASK']
    },
    SUPPORTER: {
        priority: PRIORITY.MED,
        permissions: ['UPDATE_SELF_TASK', 'REPORT_SPAM_TASK']
    }
}

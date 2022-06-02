export const enum Priority {
  LOW = 3,
  MEDIUM = 2,
  HIGH = 1,
}

export const PriorityText: Record<Priority, string> = {
  [Priority.LOW]: 'низкий',
  [Priority.MEDIUM]: 'средний',
  [Priority.HIGH]: 'высокий',
};

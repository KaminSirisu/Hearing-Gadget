export function calculateSetupProgress(checklist) {
    const totalCount = checklist.length;
    if (!checklist || totalCount === 0) {
        return null;
    }

    const completedCount = checklist.filter(item => item.completed).length;
    const percent = Math.round((completedCount/totalCount) * 100);
    const missingItems = checklist
        .filter(item => !item.completed)
        .map(item => item.label);

    return {
        percent,
        completedCount,
        totalCount,
        missingItems
    };
}
